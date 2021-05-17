import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { Pool } from 'pg';

Object.prototype['renameProperty'] = function (
  oldName: string,
  newName: string,
) {
  if (oldName === newName) {
    return this;
  }
  if (this.hasOwnProperty(oldName)) {
    this[newName] = this[oldName];
    delete this[oldName];
  }
  return this;
};

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PWD,
  port: process.env.PORT,
};

const pool = new Pool(config);

//приведення даних з бд в правильний вид
function dataSuitier(lists, notes) {
  const res = {
    lists: lists,
    notes: notes,
  };
  res.notes.forEach((note) => {
    note.renameProperty('noteid', 'id');
    note.renameProperty('listid', 'listId');
    note.renameProperty('notename', 'noteName');
    note.renameProperty('datecreate', 'dateCreate');
    note.renameProperty('datecomplation', 'dateComplation');
  });
  res.lists.forEach((list) => {
    list.renameProperty('listid', 'id');
    list.renameProperty('listname', 'listName');
  });
  return res;
}

function getListsAndNotesFromDB(user: string) {
  const promise = new Promise(function (resolve) {
    pool.query(`select * from gettingNotes('${user}')`, (err, notes) => {
      resolve(notes.rows);
    });
  });
  return promise
    .then(function (notes) {
      return new Promise(function (resolve) {
        pool.query(`select * from gettingLists('${user}')`, (err, lists) => {
          resolve([notes, lists.rows]);
        });
      });
    })
    .then(function (notesAndLists) {
      return dataSuitier(notesAndLists[1], notesAndLists[0]);
    });
}

function updNotes(data: {
  googleIdentify: number;
  noteName: string;
  createDate: number;
  deadlineTask: number;
  importantTask: boolean;
  statusComp: boolean;
  idlist?: number | null;
}) {
  /*
   * update or create new note
   */
  const promise = new Promise(function (resolve) {
    pool.query(
      `select * from settingNote('${data.googleIdentify}',
 '${data.noteName}',
 '${data.createDate}',
  '${data.deadlineTask}',
  '${+data.importantTask}', 
  '${+data.statusComp}'
   ${data.idlist ? `,'${data.idlist}'` : ''})`,
      (err, id) => {
        if (err) {
          resolve(-1);
          return;
        }
        console.log(id.rows);
        resolve(id.rows);
      },
    );
  });
  return promise.then(function (id) {
    return id;
  });
}

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('get_lists_and_notes')
  handleList(client: Socket, user: string) {
    const serv = this.server;
    client.join(`${user}`);
    const promise = new Promise(function (resolve) {
      const t = getListsAndNotesFromDB(user);
      resolve(t);
    });
    promise.then(function (datafrombd) {
      console.log(datafrombd);
      serv.to(user).emit('data', datafrombd);
    });
  }

  @SubscribeMessage('upd_notes')
  handleListCreate_or_Upd(
    client: Socket,
    data: {
      googleIdentify: number;
      noteName: string;
      createDate: number;
      deadlineTask: number;
      importantTask: boolean;
      statusComp: boolean;
      idlist?: number | null;
    },
  ): void {
    const serv = this.server;
    client.join(`${data.googleIdentify}`);
    const promise = new Promise(function (resolve) {
      const t = updNotes(data);
      resolve(t);
    });
    promise.then(function (datafrombd) {
      console.log(datafrombd);
      serv.to(data.googleIdentify).emit('dataUPD', datafrombd);
    });
  }

  @SubscribeMessage('updlist')
  handleListUPD(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    client: Socket,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: {
      googleIdentify: number;
      nameList: string;
    },
  ): void {
    /*update list*/
  }
}
