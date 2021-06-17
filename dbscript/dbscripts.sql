/*
The database was created using AWS, 
a cloud service for managing and storing data. 
Postgresql database.
*/

/*
A database for the On Time app that helps 
you plan your time and complete tasks on time.
*/


/*
Script for create database
*/

create  table "user"(
googleID varchar PRIMARY KEY ,
fullName  varchar, 
linkImg varchar,
email varchar,
dateRegistration bigint
)

create  table list(
"ID" int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
userID varchar,
"name" varchar,
"delete" bool,
FOREIGN KEY(userID)
REFERENCES "user"(googleID)
)

create table pomoState(
"ID" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
userID varchar,
status bool,
startTime bigint,
totalPomo int,
FOREIGN KEY(userID)
REFERENCES "user"(googleID)
)

create table pomoSettings(
"ID" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
userID varchar,
pomoDur int,
shortBreakDur int,
longBreakDur int,
longBreakEvery int,
dailyFocusGoal int,
FOREIGN KEY(userID)
REFERENCES "user"(googleID)
)

create table note (
"ID" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
listID int,
userID varchar,
"name" varchar,
dateCreate bigint,
deadline bigint, 
dateComplation bigint, 
important bool, 
status bool,  
deleteDate bigint,
FOREIGN KEY(userID)
REFERENCES "user"(googleID),
FOREIGN KEY(listID)
REFERENCES "list"("ID")
)


/*
Functions for managing data
*/

CREATE OR REPLACE FUNCTION public.setorupdateuser(gid character varying,
                                                nameuser character varying, mail character varying, datereg bigint,
                                                img character varying DEFAULT NULL::character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$	
begin
	if (select (select count(googleID) from "user" where googleID = gID)) = 0 then 
		insert into "user"(googleID, fullName, linkImg, email, dateRegistration)
		values (gID, nameUser, img, mail, dateReg);
		return 'user added';
	else
		update "user" set fullname = nameUser where googleID = gID;
		update "user" set linkImg = img where googleID = gID;
		return 'info of user updated';
	end if;
end
$function$

CREATE OR REPLACE FUNCTION public.settinglist(googleidentify character varying, 
                                            namelist character varying, 
                                            statusdelete boolean DEFAULT false)
 RETURNS integer
 LANGUAGE sql
AS $function$
insert into list (userID, "name", "delete")
values(googleIdentify, nameList, statusDelete)
returning "ID"
$function$

CREATE OR REPLACE FUNCTION public.settingnote(googleidentify character varying,
                                             notename character varying, createdate bigint,
                                              deadlinetask bigint, importanttask boolean, 
                                              statuscomp boolean, idlist integer DEFAULT NULL::integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
declare 
	iduser varchar(50) = '-1';
	new_id int = 0;
begin
	if idlist is not  null then
	EXECUTE 'select * from  getIDbyList('|| idlist ||'  );' INTO iduser;
		if iduser = googleIdentify then
			insert into note (userID, listID, "name", dateCreate, deadline, important, status)
			values(googleIdentify, idlist,noteName, createDate, deadlineTask, importantTask, statusComp)
			returning "ID" into new_id;
			return new_id;
		else
			return '-1';
		end if;    
    end if;
	insert into note (userID, listID, "name", dateCreate, deadline, important, status)
			values(googleIdentify, idlist,noteName, createDate, deadlineTask, importantTask, statusComp)
			returning "ID" into new_id;
			return new_id;
end
$function$

CREATE OR REPLACE FUNCTION public.gettingnotes(googleidentify character varying)
 RETURNS TABLE(listid integer, noteid integer,
             notename character varying, datecreate bigint,
              deadline bigint, datecomplation bigint, 
              important boolean, status boolean)
 LANGUAGE sql
AS $function$ 
	select   distinct 
	 note.listID, note."ID" as noteID,
	 note."name" as noteName, note.dateCreate, note.deadline,
	 note.dateComplation, note.important, note.status
	from "user"
	inner join note on "user".googleID=note.userID
	where "user".googleID=googleIdentify and note.deleteDate is null
$function$

CREATE OR REPLACE FUNCTION public.gettinglists(googleidentify character varying)
 RETURNS TABLE(listid integer, listname character varying)
 LANGUAGE sql
AS $function$ 
	select   distinct 
	list."ID",  list."name" as listName
	from "user" 
	inner join list on "user".googleID=list.userID
	where "user".googleID=googleIdentify and list.delete<>'1'
$function$

CREATE OR REPLACE FUNCTION public.getidbylist(idlist integer)
 RETURNS character varying
 LANGUAGE sql
AS $function$
select userID from List where list."ID"=idlist
$function$

CREATE OR REPLACE FUNCTION public.getidbynote(idnote integer)
 RETURNS character varying
 LANGUAGE sql
AS $function$
select userID from Note where note."ID"=idnote
$function$

CREATE OR REPLACE FUNCTION public.deletenote(iduser integer, idnote integer, datedel bigint)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
declare
	buff_id int = '-1';
	del bigInt = dateDel;
begin
	EXECUTE 'select * from  getIDbyNote('|| idnote ||'  );' INTO buff_id;
	if iduser = buff_id then
		update Note set deleteDate = del where Note."ID" = idnote;
		return 'Note deleted';
	else
		return 'Note can`t be delete';
	end if;
end
$function$

CREATE OR REPLACE FUNCTION public.deletelist(userid character varying, idlist integer, datedel bigint)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
--когда удаляется список, удалять все заметки 
declare 
	buffer int = idlist;
	checkID varchar = '';
begin
	EXECUTE 'select * from  getIDbyList('|| idlist ||'  );' INTO checkID;
	if checkID = userid then
		update List set "delete" = '1' where List."ID" = buffer;
		update Note set deleteDate = dateDel where Note.listID = buffer;
		return 'delete list';
	else
		return 'list can`t be deleted';
	end if;
end
$function$

CREATE OR REPLACE FUNCTION public.updatelist(userid character varying,
                                             idlist integer, namelist character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
declare 
	buffer int = idlist;
	checkID varchar = '';
begin
	EXECUTE 'select * from  getIDbyList('|| idlist ||'  );' INTO checkID;
	if checkID = userid then
		update List set "name" = nameList where List."ID" = buffer;
		return 'update list';
	else
		return 'list can`t be update';
	end if;
end
$function$

CREATE OR REPLACE FUNCTION public.updatenote(iduser integer, idnote integer,
                                             notename character varying, dline bigint,
                                              datecomp bigint, impor boolean)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
declare
	buff_id int = '-1';
begin
	EXECUTE 'select * from  getIDbyNote('|| idnote ||'  );' INTO buff_id;
	if iduser = buff_id then
		update Note set "name" = noteName where Note."ID" = idnote;
		update Note set deadline = dline where Note."ID" = idnote;
		update Note set dateComplation = dateComp where Note."ID" = idnote;
		update Note set important = impor where Note."ID" = idnote;
		if (select dateComplation from Note where Note."ID" = idnote)  is not null  then 
			update Note set status = '1' where Note."ID" = idnote;
		end if;
		return 'Note update';
	else
		return 'Note can`t be update';
	end if;
end
$function$