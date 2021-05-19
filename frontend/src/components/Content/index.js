/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Tasks from '../Tasks';

import './Tasks.scss';

const msInDay = 24 * 3600 * 1000;

export default function Content({
  lists,
  /* onChangeTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onChangeCompTask,
  onChangeImpTask,
  */
}) {
  /*
  function dayTasks() { 
     const newList = list;
     newList.tasks = newList.tasks.filter(task => task.deadline === Number(new Date().setHours(0, 0, 0, 0)));
    console.log('Hellojkjkjkjjj', newList)
     return newList;
  }

  function weekTasks() {
    const newList =  list;
    newList.tasks = newList.tasks.filter(task => task.deadline < Number(new Date().setHours(0, 0, 0, 0)) + 24*3600*1000)
    return newList;
  }

  function importantTasks() {
    const newList =  list;
    newList.tasks = newList.tasks.filter(task => task.important)
    return newList;
  }

  <Tasks 
            list={weekTasks()}
            onChangeTitle={onChangeTitle}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onChangeCompTask={onChangeCompTask}
            onChangeImpTask={onChangeImpTask}
        />
*/
  const baseList = lists.find((list) => list.name === 'Base');
  if (baseList) baseList.tasks.sort((t1, t2) => t1.deadline - t2.deadline);

  console.log(lists, baseList);
  return (
    <div>
      <Switch>
        <Route path="/today">
          {baseList && <DayTasks selList={baseList} />}
        </Route>
        <Route path="/week">
          {baseList && <WeekTasks selList={baseList} />}
        </Route>
        <Route path="/important">
          {baseList && <ImportantTasks selList={baseList} />}
        </Route>
        <Route path="/affairs">
          {baseList && <AffairsTasks selList={baseList} />}
        </Route>
        <Route path="/planned">
          {baseList && <PlannedTasks selList={baseList} />}
        </Route>
        <Route path="/pomodoro">
          <h1>Hello, this is pomodoro</h1>
        </Route>

        {lists.map((list) => (
          <Route key={list.id} path={'/userList' + list.id}>
            <ShowTasks selList={list} />
          </Route>
        ))}
      </Switch>
    </div>
  );
}

function WeekTasks({ selList }) {
  const newList = JSON.parse(JSON.stringify(selList));
  newList.tasks = newList.tasks.filter(
    (task) =>
      task.deadline <= Number(new Date().setHours(0, 0, 0, 0)) + msInDay * 6,
  );
  return <Tasks list={newList} listName="Week" />;
}

function DayTasks({ selList }) {
  const newList = JSON.parse(JSON.stringify(selList));
  newList.tasks = newList.tasks.filter(
    (task) => task.deadline <= Number(new Date().setHours(0, 0, 0, 0)),
  );
  return <Tasks list={newList} listName="Today" />;
}

function ImportantTasks({ selList }) {
  const newList = JSON.parse(JSON.stringify(selList));
  newList.tasks = newList.tasks.filter((task) => task.important);
  return <Tasks list={newList} listName="Important" />;
}

function AffairsTasks({ selList }) {
  return <Tasks list={selList} listName="Affairs" />;
}

function PlannedTasks({ selList }) {
  const newList = JSON.parse(JSON.stringify(selList));
  newList.tasks = newList.tasks.filter(
    (task) =>
      task.deadline > Number(new Date().setHours(0, 0, 0, 0)) + msInDay * 6,
  );
  return <Tasks list={newList} listName="Planned" />;
}

function ShowTasks({ selList }) {
  return <Tasks list={selList} />;
}
