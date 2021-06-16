import React from 'react';
import axios from 'axios';

import './AddList.scss';
import CancelSvg from '../../assets/cancel.svg';

export default function AddList({ onSave, isVisible, setVisibility }) {
  // const [isVisible, setVisibility] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  function saveList() {
    if (inputValue)
      axios
        .post('http://localhost:3001/lists', { name: inputValue })
        .then(({ data }) => {
          const newData = { ...data, tasks: [] };
          console.log(data, newData);
          onSave(newData);
        });
    setVisibility();
    setInputValue('');
  }

  return (
    <div>
      {isVisible && (
        <div className="add-list__form">
          <img
            alt="close"
            src={CancelSvg}
            onClick={setVisibility}
            className="add-list-close-btn"
          />
          <input
            value={inputValue}
            onChange={(ev) => setInputValue(ev.target.value)}
            type="text"
            placeholder="List Name"
            className="input-place  inputAlign"
          />
          <button type="button" onClick={saveList} className="button">
            Save
          </button>
        </div>
      )}
    </div>
  );
}
