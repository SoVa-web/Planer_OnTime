import React from 'react';
import List from './components/List';
import AddList from './components/AddList';
import Db from './assets/db.json';

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
  const [lists, setLists] = React.useState(Db.lists);

  const isRemovable = true;

  function onSaveList(obj) {
    const newLists = [...lists, obj];
    console.log(newLists);
    setLists(newLists);
  }

  function onRemove(item) {
    const newLists = lists.filter((ll) => ll.id !== item.id);
    console.log(newLists);
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
      <div className="planner__content"> </div>
    </div>
  );
}

export default App;
