import React from 'react';
import List from '../List';

import './AddList.scss';
import CancelSvg from '../../assets/cancel.svg';

const addList = [{ id: 7, name: 'Add list' }];

export default function AddList() {
  const [isVisible, setVisibility] = React.useState(false);

  return (
    <div>
      <List items={addList} onClick={() => setVisibility(!isVisible)} />
      {isVisible && (
        <div className="add-list__form">
          <img
            alt="close"
            src={CancelSvg}
            onClick={() => setVisibility(false)}
            className="add-list-close-btn"
          />
          <input type="text" placeholder="List Name" className="input-place" />
          <button type="button" className="button">
            Save
          </button>
        </div>
      )}
    </div>
  );
}
