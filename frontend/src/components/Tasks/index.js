/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Tasks.scss';

import CheckSvg from '../../assets/check.svg';

export default function Tasks() {
  return (
    <div className="tasks">
      <h1 className="tasks__title">Men`s physique</h1>
      <div className="tasks__items">
        <div className="tasks__items_item">
          <div className="checkbox">
            <input id="done" type="checkbox" />
            <label htmlFor="done">
              <img alt="done" src={CheckSvg} />
            </label>
          </div>
          <input value="Hello from California" />
        </div>
      </div>
    </div>
  );
}
