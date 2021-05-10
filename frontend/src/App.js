import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { List, AddList, Tasks } from './components';
// import Db from './assets/db.json';

const categ = [
  { id: 1, name: 'Сьогодні', selected: false },
  { id: 2, name: 'Тиждень', selected: false },
  { id: 3, name: 'Важливі', selected: false },
  { id: 4, name: 'Справи', selected: false },
  { id: 5, name: 'Заплановані', selected: false },
  { id: 6, name: 'Pomodoro', selected: false },
];

// eslint-disable-next-line no-unused-vars
const lists1 = [
  { id: 8, name: 'Workout' },
  { id: 9, name: 'Endglish' },
];

function App() {
  const [lists, setLists] = React.useState([]);
  const [selectedList, setSelectedList] = React.useState(null);
  const isRemovable = true;
  const listsHistory = useHistory();

  function getData() {
    axios
      .get('http://localhost:3001/lists?_embed=tasks')
      .then(({ data }) => setLists(data));
  }

  React.useEffect(getData, []);

  React.useEffect(() => {
    const pathId = Number(listsHistory.location.pathname.split('lists/')[1]);
    if (lists) {
      const selList = lists.find((item) => item.id === pathId);
      setSelectedList(selList);
      console.log(listsHistory);
    }
  }, [listsHistory.location.pathname, lists]);

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
    axios
      .delete('http://localhost:3001/tasks/' + task.id)
      .then(() => getData());
    console.log(task.id);
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

  return (
    <div className="planner">
      <div className="planner__sidebar">
        <List
          items={categ}
          onClickList={(selList) => {
            console.log(selList);
          }}
        />
        <hr />
        <List
          items={lists}
          isRemovable={isRemovable}
          onRemove={onRemove}
          onClickList={(selList) => {
            listsHistory.push('/lists/' + selList.id);
            setSelectedList(selList);
          }}
          selectedList={selectedList}
        />
        <AddList onSave={onSaveList} />
      </div>
      <div className="planner__content">
        {console.log(selectedList)}
        {lists[2] && selectedList && (
          <Tasks
            list={selectedList}
            onChangeTitle={onChangeTitleInList}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onChangeCompTask={onChangeCompTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
