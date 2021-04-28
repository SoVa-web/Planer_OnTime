import React from 'react';
import axios from 'axios';
import { List, AddList, Tasks } from './components';
// import Db from './assets/db.json';

const categ = [
  { id: 1, name: 'Сьогодні', active: false },
  { id: 2, name: 'Тиждень', active: true },
  { id: 3, name: 'Важливі', active: false },
  { id: 4, name: 'Справи', active: false },
  { id: 5, name: 'Заплановані', active: false },
  { id: 6, name: 'Pomodoro', active: false },
];

// eslint-disable-next-line no-unused-vars
const lists1 = [
  { id: 8, name: 'Workout' },
  { id: 9, name: 'Endglish' },
];

function App() {
  const [lists, setLists] = React.useState([]);
  const isRemovable = true;
  function getData() {
    axios
      .get('http://localhost:3001/lists?_embed=tasks')
      .then(({ data }) => setLists(data));
    console.log('Aga');
  }

  React.useEffect(getData, []);

  function onSaveList(obj) {
    console.log(lists);
    console.log(obj);
    const newLists = [...lists, obj];
    // console.log(newLists);
    setLists(newLists);
  }

  function onRemove(item) {
    const newLists = lists.filter((ll) => ll.id !== item.id);
    // console.log(newLists);
    setLists(newLists);
  }
  return (
    <div className="planner">
      <div className="planner__sidebar">
        <List items={categ} />
        <hr />
        <List items={lists} isRemovable={isRemovable} onRemove={onRemove} />
        <AddList onSave={onSaveList} />
      </div>
      <div className="planner__content">
        {lists[1] && <Tasks list={lists[1]} />}
      </div>
    </div>
  );
}

export default App;
