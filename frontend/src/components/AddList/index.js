import React from 'react';
import List from '../List';

import './AddList.scss';
import CancelSvg from '../../assets/cancel.svg';

const defaultName = [{ id: 7, name: 'Add list' }];

export default function AddList({ onSave }) {
  const [isVisible, setVisibility] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  function saveList() {
    if (inputValue) onSave({ id: Math.random(), name: inputValue });
    setVisibility(false);
    setInputValue('');
  }

  return (
    <div>
      <List items={defaultName} onClick={() => setVisibility(!isVisible)} />
      {isVisible && (
        <div className="add-list__form">
          <img
            alt="close"
            src={CancelSvg}
            onClick={() => setVisibility(false)}
            className="add-list-close-btn"
          />
          <input
            value={inputValue}
            onChange={(ev) => setInputValue(ev.target.value)}
            type="text"
            placeholder="List Name"
            className="input-place"
          />
          <button type="button" onClick={saveList} className="button">
            Save
          </button>
        </div>
      )}
    </div>
  );
}
