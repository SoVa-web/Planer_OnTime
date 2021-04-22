import React from 'react';
import List from './components/List';

const categ = [
  { id: 1, name: 'Сьогодні' },
  { id: 2, name: 'Тиждень' },
  { id: 3, name: 'Важливі' },
  { id: 4, name: 'Справи' },
  { id: 5, name: 'Заплановані' },
  { id: 6, name: 'Pomodoro' },
];

const lists = [
  { id: 7, name: 'Workout' },
  { id: 8, name: 'Endglish' },
];

function App() {
  return (
    <div className="planner">
      <div className="planner__sidebar">
        <List items={categ} />
        <hr />
        <List items={lists} />
      </div>
      <div className="planner__content"> </div>
    </div>
  );
}

export default App;
