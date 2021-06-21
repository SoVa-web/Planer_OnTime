/* eslint-disable dot-notation */
/* eslint-disable no-empty */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React from 'react';
import axios from 'axios';
import Context from './context';
import { List, AddList, Content } from './components';
import './App.css';

const socket = window.io.connect('ws://planer-ontime.herokuapp.com');

function App() {
  const [lists, setLists] = React.useState([]);
  const [selectedList, setSelectedList] = React.useState(null);
  const [isVisibleForm, setFormVisibility] = React.useState(false);
  const isRemovable = true;
  /* const [googleUserId, setGoogleUserId] = React.useState(null); */
  const [userInfo, setUserInfo] = React.useState(
    localStorage.getItem('authInfo'),
  );

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });

  React.useEffect(() => {
    const onInit = (auth2) => {
      console.log('init OK', auth2);
    };
    const onError = (err) => {
      console.log('error', err);
    };
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(onInit, onError);
    });
  }, []);

  function signIn() {
    const authOK = (user) => {
      console.log('OK AUTH');
      setUserInfo({
        googleUserId: user.getBasicProfile().getId(),
        name: user.getBasicProfile().getName(),
        imgUrl: user.getBasicProfile().getImageUrl(),
        email: user.getBasicProfile().getEmail(),
      });
      console.log(userInfo);
      localStorage.setItem('authInfo', {
        googleUserId: user.getBasicProfile().getId(),
        name: user.getBasicProfile().getName(),
        imgUrl: user.getBasicProfile().getImageUrl(),
        email: user.getBasicProfile().getEmail(),
      });
      fetch('https://planer-ontime.herokuapp.com/get', {
        method: 'POST',
        body: JSON.stringify({
          googleUserId: user.getBasicProfile().getId(),
          name: user.getBasicProfile().getName(),
          imgUrl: user.getBasicProfile().getImageUrl(),
          email: user.getBasicProfile().getEmail(),
        }),
      }).then(async (resp) => {
        const r = await resp.text();
        console.log('user', r);
      });
    };

    const authErr = () => {
      console.log('err with auth');
    };
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signIn().then(authOK, authErr);
  }

  function signOut() {
    const out = () => {
      setUserInfo(null);
      localStorage.removeItem('authInfo');
    };
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(out);
    console.log('out out out', userInfo);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  function getData() {
socket.once('data', (answer) => {
        console.table(answer)
        answer.lists.push({
          id:null,
          listName:'Base'
        })
        for (const i of answer.lists){
         i.tasks = [] 
         for(const j of answer.notes){
           // eslint-disable-next-line eqeqeq
           if (j.listId ==i.id) i.tasks.push(j)
         }
         if (!i.id) {
          for(const j of answer.notes){
            // eslint-disable-next-line eqeqeq
            if (!j.listId) console.log("KKKKKKKK")
          }
         }
        }
       console.log("AAAAAAAAAAAA", answer.lists)
        setLists(answer.lists)
      });
      socket.emit('get_lists_and_notes', 9); 
/*    axios
     .get('http://localhost:3001/lists?_embed=tasks')
     .then(({ data }) => {setLists(data)
    console.log("DDDDDDDD", data)}); */
  }

  // getData().then((data)=>{console.log("DDDDDDDDDDDD", data)})

  

  React.useEffect(getData, []);

  function onSaveList(obj) {
    const newLists = [...lists, obj];
    setLists(newLists);
  }

  function onRemove(item) {
    const newLists = lists.filter((ll) => ll.id !== item.id);
    setLists(newLists);
  }

  function onChangeTitleInList(listId, newTitle) {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        const changedList = list;
        changedList.name = newTitle;
        return changedList;
      }
      return list;
    });

    setLists(newLists);
  }

  function onAddTask(listId, task) {
    const newLists = lists.map((oneList) => {
      if (oneList.id === listId) {
        const newList = oneList;
        newList.tasks = [...oneList.tasks, task];
        return newList;
      }
      return oneList;
    });
    setLists(newLists);
  }

  function onRemoveTask(task) {
    const path = 'http://localhost:3001/tasks/' + task.id;
    if (!task.completed) {
      axios.delete(path).then(() => getData());
      console.log(task.id);
    } else {
      axios
        .patch(path, { deleteDate: Number(new Date().setHours(0, 0, 0, 0)) })
        .then(() => getData());
    }
  }

  function onEditTask(task) {
    // eslint-disable-next-line no-alert
    const editTitle = prompt('task title', task.title);

    if (editTitle && editTitle !== task.title) {
      axios
        .patch('http://localhost:3001/tasks/' + task.id, { title: editTitle })
        .then(() => getData());
    }
  }

  function onChangeCompTask(task, completed) {
    const compList = lists.map((list) => {
      if (list.id === task.listId) {
        const newList = list;
        newList.tasks = list.tasks.map((oldTask) => {
          if (oldTask.id === task.id) {
            const newTask = oldTask;
            newTask.completed = completed;
            return newTask;
          }
          return oldTask;
        });
      }
      return list;
    });
    setLists(compList);
  }

  function onChangeImpTask(task, important) {
    const compList = lists.map((list) => {
      if (list.id === task.listId) {
        const newList = list;
        newList.tasks = list.tasks.map((oldTask) => {
          if (oldTask.id === task.id) {
            const newTask = oldTask;
            newTask.important = important;
            return newTask;
          }
          return oldTask;
        });
      }
      return list;
    });
    setLists(compList);
  }

  return (
    <Context.Provider
      value={{
        onChangeTitleInList,
        onAddTask,
        onRemoveTask,
        onEditTask,
        onChangeCompTask,
        onChangeImpTask,
      }}
    >
      <header className="App-header">ON TIME</header>
      <div>
        {!!userInfo && (
          <div>
            <div id="infoAuth">Таски</div>
            <button type="button" onClick={signOut}>
              Log Out
            </button>
          </div>
        )}
        {!userInfo && (
          <div>
            <div id="infoAuth">
              <div>Виконай все вчасно</div>
              <div>Виконайте вхід з Google</div>
            </div>
            <button type="button" onClick={signIn}>
              Log In
            </button>
          </div>
        )}
      </div>
      <div className="planner">
        <div className="planner__sidebar">
          <List
            lists={lists}
            selectedList={selectedList}
            isRemovable={isRemovable}
            onRemove={onRemove}
            changeFormVisibility={() => setFormVisibility(!isVisibleForm)}
            onClickList={(selList) => {
              setSelectedList(selList);
              console.log('selList', selList);
            }}
            userInfo={userInfo}
          />
          {!!userInfo && (
            <AddList
              onSave={onSaveList}
              isVisible={isVisibleForm}
              setVisibility={() => setFormVisibility(!isVisibleForm)}
            />
          )}
        </div>

        <div className="planner__content">
          {!userInfo && (
            <div>
              Вітаємо, здійсни авторизацію з Google та виконуй все вчасно (^_^)
            </div>
          )}
          {console.log(selectedList)}
          {
            // lists[2] && selectedList &&
            !!userInfo && (
              <Content
                list={selectedList}
                lists={lists}
                onChangeTitle={onChangeTitleInList}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onChangeCompTask={onChangeCompTask}
                onChangeImpTask={onChangeImpTask}
              />
            )
          }
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
