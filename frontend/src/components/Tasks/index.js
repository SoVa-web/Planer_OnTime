/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import axios from 'axios';
import AddTask from '../AddTask';
import './Tasks.scss';
import Context from '../../context';

import CheckSvg from '../../assets/check.svg';
import EditSvg from '../../assets/edit.svg';
// import Edit2Svg from '../../assets/edit2.svg';
// import DeleteSvg from '../../assets/cross2.svg';
import StarSvg from '../../assets/star.svg';
import MoreSvg from '../../assets/more.svg';

export default function Content({ list, listName }) {
  const {
    onChangeTitleInList,
    onAddTask,
    /* onRemoveTask,
      onEditTask, */
    onChangeCompTask,
    onChangeImpTask,
  } = useContext(Context);
  const changeTitle = () => {
    // eslint-disable-next-line no-alert
    const newTitle = window.prompt('Title name', list.name);
    if (newTitle) {
      onChangeTitleInList(list.id, newTitle);
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

  function onChangeImpStatus(event, task) {
    axios.patch('http://localhost:3001/tasks/' + task.id, {
      important: event.target.checked,
    });
    onChangeImpTask(task, event.target.checked);
  }

  function daysLeft(taskDeadline) {
    const curDate = Number(new Date().setHours(0, 0, 0, 0));
    const diff = Math.round((taskDeadline - curDate) / (24 * 3600 * 1000));
    if (diff === 0) return 'today';
    else if (diff === 1) return '1 day left';
    else if (diff > 1) return `${diff} days left`;
    else if (diff === -1) return `${-diff} day overdue`;

    return `${-diff} days overdue`;
  }

  return (
    <div className="tasks">
      {listName ? (
        <div className="tasks__title">
          <h1 className="title">{listName}</h1>
        </div>
      ) : (
        <div className="tasks__title">
          <h1 className="title">{list.listName}</h1>
          <img alt="edit" src={EditSvg} onClick={() => changeTitle()} />
        </div>
      )}

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
                  <label htmlFor={`done${item.id}`} className="done-label">
                    <img alt="done" src={CheckSvg} />
                  </label>
                </div>
                <div className="task">
                  <p>{item.title}</p>
                  <div className="task__icons">
                    <p className="task__deadline">{daysLeft(item.deadline)}</p>
                    {/* <img
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
                    */}
                    <div className="checkbox">
                      <input
                        id={`important${item.id}`}
                        type="checkbox"
                        onChange={(event) => onChangeImpStatus(event, item)}
                        checked={item.important}
                      />
                      <label
                        htmlFor={`important${item.id}`}
                        className="imp-label"
                      >
                        <img alt="important" src={StarSvg} />
                      </label>
                    </div>
                    <img src={MoreSvg} alt="more" className="more-img" />
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
