/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Tasks.scss';

import CheckSvg from '../../assets/check.svg';

export default function Tasks({ list }) {
  return (
    <div className="tasks">
      <h1 className="tasks__title">{list.name}</h1>
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
      </div>
    </div>
  );
}
