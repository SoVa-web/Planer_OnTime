import React from 'react';
import axios from 'axios';
import Context from './context';
import { List, AddList, Content, Header } from './components';

function App() {
  const [lists, setLists] = React.useState([]);
  const [selectedList, setSelectedList] = React.useState(null);
  const [isVisibleForm, setFormVisibility] = React.useState(false);
  const isRemovable = true;
  // console.log('SelListrr', selectedList);
  function getData() {
    axios
      .get('http://localhost:3001/lists?_embed=tasks')
      .then(({ data }) => setLists(data));
  }

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
      // console.log(task.id);
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
      <div className="base">
        <Header />
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
                //  console.log('selList', selList);
              }}
            />
            <AddList
              onSave={onSaveList}
              isVisible={isVisibleForm}
              setVisibility={() => setFormVisibility(!isVisibleForm)}
            />
          </div>

          <div className="planner__content">
            {
              // lists[2] && selectedList &&
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
            }
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
