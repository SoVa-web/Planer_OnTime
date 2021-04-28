import React from 'react';
import axios from 'axios';
import { List, AddList, Tasks } from './components';
// import Db from './assets/db.json';

const categ = [
  { id: 1, name: 'Сьогодні', selected: false },
  { id: 2, name: 'Тиждень', selected: true },
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

  function getData() {
    axios
      .get('http://localhost:3001/lists?_embed=tasks')
      .then(({ data }) => setLists(data));
    console.log('Aga');
  }

  React.useEffect(getData, []);

  function onSaveList(obj) {
    const newLists = [...lists, obj];
    // console.log(newLists);
    setLists(newLists);
  }

  function onRemove(item) {
    const newLists = lists.filter((ll) => ll.id !== item.id);
    // console.log(newLists);
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
            setSelectedList(selList);
          }}
          selectedList={selectedList}
        />
        <AddList onSave={onSaveList} />
      </div>
      <div className="planner__content">
        {console.log(selectedList)}
        {lists[2] && selectedList && (
          <Tasks list={selectedList} onChangeTitle={onChangeTitleInList} />
        )}
      </div>
    </div>
  );
}

export default App;
