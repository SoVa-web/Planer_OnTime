import React from 'react';
import List from './components/List';
import AddList from './components/AddList';

const categ = [
  { id: 1, name: 'Сьогодні', active: false },
  { id: 2, name: 'Тиждень', active: true },
  { id: 3, name: 'Важливі', active: false },
  { id: 4, name: 'Справи', active: false },
  { id: 5, name: 'Заплановані', active: false },
  { id: 6, name: 'Pomodoro', active: false },
];

const lists = [
  { id: 8, name: 'Workout' },
  { id: 9, name: 'Endglish' },
];

function App() {
  return (
    <div className="planner">
      <div className="planner__sidebar">
        <List items={categ} />
        <hr />
        <List items={lists} />
        <AddList />
      </div>
      <div className="planner__content"> </div>
    </div>
  );
}

export default App;
