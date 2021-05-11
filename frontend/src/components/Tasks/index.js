/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import AddTask from '../AddTask';
import './Tasks.scss';

import CheckSvg from '../../assets/check.svg';
import EditSvg from '../../assets/edit.svg';
import Edit2Svg from '../../assets/edit2.svg';
import DeleteSvg from '../../assets/cross2.svg';

export default function Tasks({
  list,
  onChangeTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onChangeCompTask,
}) {
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

  function onChangeCompStatus(event, task) {
    console.log(task, event.target.checked);
    axios.patch('http://localhost:3001/tasks/' + task.id, {
      completed: event.target.checked,
      compDate: Number(new Date().setHours(0, 0, 0, 0)),
    });
    onChangeCompTask(task, event.target.checked);
  }

  return (
    <div className="tasks">
      <div className="tasks__title">
        <h1 className="title">{list.name}</h1>
        <img alt="edit" src={EditSvg} onClick={() => changeTitle()} />
      </div>
      <div className="tasks__items">
        {list.tasks &&
          list.tasks.map((item) =>
            !item.deleteDate ? (
              <div key={item.id} className="tasks__items_item">
                <div className="checkbox">
                  <input
                    id={`done${item.id}`}
                    type="checkbox"
                    onChange={(event) => onChangeCompStatus(event, item)}
                    checked={item.completed}
                  />
                  <label htmlFor={`done${item.id}`}>
                    <img alt="done" src={CheckSvg} />
                  </label>
                </div>
                <div className="task">
                  <p>{item.title}</p>
                  <div className="task__icons">
                    <img
                      alt="edit"
                      src={Edit2Svg}
                      className="task-img"
                      onClick={() => onEditTask(item)}
                    />
                    <img
                      alt="delete"
                      src={DeleteSvg}
                      className="task-img"
                      onClick={() => onRemoveTask(item)}
                    />
                    <div className="important-img" />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            ),
          )}
        <AddTask key={list.id} onAddTask={onAddTask} list={list} />
      </div>
    </div>
  );
}
