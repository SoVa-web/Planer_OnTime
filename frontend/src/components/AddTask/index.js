import React from 'react';
import './AddTask.scss';

import axios from 'axios';

import PlusSvg from '../../assets/plus.svg';

export default function AddTask({ onAddTask, list }) {
  const [isVisibleForm, setFormVisibility] = React.useState(false);
  const [inputTitle, setInputTitle] = React.useState('');

  function changeFormVisibility() {
    setFormVisibility(!isVisibleForm);
    setInputTitle('');
  }

  function saveTask() {
    let today = new Date();
    today = Number(today.setHours(0, 0, 0, 0));

    const expDate = today;
    const imp = false;

    const newTask = {
      listId: list.id,
      title: inputTitle,
      creationDate: today,
      deadline: expDate,
      compDate: null,
      important: imp,
      completed: false,
      deleteDate: null,
    };

    /*
    const newTask = {
      googleIdentify: 8,
      noteName: inputTitle,
      createDate: today,
      deadlineTask: expDate,
      importantTask: imp,
      statusComp: false
    }
    */

    if (inputTitle.length)
      axios.post('http://localhost:3001/tasks', newTask).then((savedTask) => {
        onAddTask(list.id, savedTask.data);
        setFormVisibility(!isVisibleForm);
        setInputTitle('');
      });
  }

  return (
    <div className="addTask">
      {!isVisibleForm ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="addTask__newTask" onClick={changeFormVisibility}>
          <img src={PlusSvg} alt="add" />
          <span>New task</span>
        </div>
      ) : (
        <div className="addTask__container">
          <input
            type="text"
            placeholder="List Name"
            className="input-place"
            value={inputTitle}
            onChange={(event) => setInputTitle(event.target.value)}
          />
          <div className="addTask__form">
            <button type="button" className="button" onClick={saveTask}>
              Add task
            </button>
            <button
              type="button"
              className="button button-cancel"
              onClick={changeFormVisibility}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
