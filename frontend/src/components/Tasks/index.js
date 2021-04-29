/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import AddTask from '../AddTask';
import './Tasks.scss';

import CheckSvg from '../../assets/check.svg';
import EditSvg from '../../assets/edit.svg';

export default function Tasks({ list, onChangeTitle, onAddTask }) {
  const changeTitle = () => {
    // eslint-disable-next-line no-alert
    const newTitle = window.prompt('Title name', list.name);
    if (newTitle) {
      onChangeTitle(list.id, newTitle);
      axios.patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle,
      });
    }
  };

  return (
    <div className="tasks">
      <div className="tasks__title">
        <h1 className="title">{list.name}</h1>
        <img alt="edit" src={EditSvg} onClick={() => changeTitle()} />
      </div>
      {console.log(list)}
      <div className="tasks__items">
        {list.tasks.map((item) => (
          <div key={item.id} className="tasks__items_item">
            <div className="checkbox">
              <input id={`done${item.id}`} type="checkbox" />
              <label htmlFor={`done${item.id}`}>
                <img alt="done" src={CheckSvg} />
              </label>
            </div>
            <input value={item.title} />
          </div>
        ))}
        <AddTask onAddTask={onAddTask} list={list} />
      </div>
    </div>
  );
}
