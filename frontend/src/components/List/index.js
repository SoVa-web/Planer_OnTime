/* eslint-disable no-param-reassign */
import React from 'react';
import classNames from 'classnames';
import './List.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ListSvg from '../../assets/list.svg';
import SunSvg from '../../assets/sun.svg';
import WeekSvg from '../../assets/week.svg';
import StarSvg from '../../assets/star.svg';
import HomeSvg from '../../assets/home.svg';
import CalendarSvg from '../../assets/calendar.svg';
import TomatoSvg from '../../assets/tomato.svg';
import PlusSvg from '../../assets/plus.svg';
import RemoveSVg from '../../assets/delete.svg';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function List({
  lists,
  onClickList,
  onRemove,
  selectedList,
  changeFormVisibility,
  userInfo,
}) {
  function icons(itemId) {
    switch (itemId) {
      case 1:
        return <img src={SunSvg} alt="icon" />;
      case 2:
        return <img src={WeekSvg} alt="icon" />;
      case 3:
        return <img src={StarSvg} alt="icon" />;
      case 4:
        return <img src={HomeSvg} alt="icon" />;
      case 5:
        return <img src={CalendarSvg} alt="icon" />;
      case 6:
        return <img src={TomatoSvg} alt="icon" />;
      case 7:
        return <img src={PlusSvg} alt="icon" />;
      default:
        return <img src={ListSvg} alt="icon" />;
    }
  }

  function removeConf(item) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Do you really want to delete list ${item.name}?`))
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item);
      });
  }

  let baseList;
  if (lists) baseList = lists.find((item) => item.name === 'Base');
  console.log('menu', lists);

  const [baseSelList, setBaseSelList] = React.useState([
    { name: 'today', sel: false },
    { name: 'week', sel: false },
    { name: 'important', sel: false },
    { name: 'planned', sel: false },
    { name: 'affairs', sel: false },
    { name: 'pomodoro', sel: false },
  ]);

  function setSelList(listName) {
    const newBaseSelList = baseSelList.map((bList) => {
      if (bList.name === listName) {
        bList.sel = true;
      } else if (bList.name !== listName && bList.sel === true) {
        bList.sel = false;
      }
      return bList;
    });
    setBaseSelList(newBaseSelList);
  }

  function isSelList(listName) {
    const list = baseSelList.find((bList) => bList.name === listName);
    return list.sel;
  }

  function onClickBaseList(listName) {
    onClickList(baseList);
    setSelList(listName);
  }

  function onClickUserList(list) {
    onClickList(list);
    setSelList(list.name);
  }

  return (
    <nav>
      <ul className="list">
        <Link to="/today">
          <li
            key="b1"
            className={classNames({
              active: selectedList && isSelList('today'),
            })}
            onClick={() => {
              onClickBaseList('today');
            }}
          >
            <i>{icons(1)}</i>
            <span>Today</span>
          </li>
        </Link>

        <Link to="/week">
          <li
            key="b2"
            className={classNames({
              active: selectedList && isSelList('week'),
            })}
            onClick={() => {
              onClickBaseList('week');
            }}
          >
            <i>{icons(2)}</i>
            <span>Week</span>
          </li>
        </Link>

        <Link to="/important">
          <li
            key="b3"
            className={classNames({
              active: selectedList && isSelList('important'),
            })}
            onClick={() => {
              onClickBaseList('important');
            }}
          >
            <i>{icons(3)}</i>
            <span>Important</span>
          </li>
        </Link>

        <Link to="/affairs">
          <li
            key="b4"
            className={classNames({
              active: selectedList && isSelList('affairs'),
            })}
            onClick={() => {
              onClickBaseList('affairs');
            }}
          >
            <i>{icons(4)}</i>
            <span>Affairs</span>
          </li>
        </Link>

        <Link to="/planned">
          <li
            key="b5"
            className={classNames({
              active: selectedList && isSelList('planned'),
            })}
            onClick={() => {
              onClickBaseList('planned');
            }}
          >
            <i>{icons(5)}</i>
            <span>Planned</span>
          </li>
        </Link>

        <Link to="/pomodoro">
          <li
            key="b6"
            className={classNames({
              active: selectedList && isSelList('pomodoro'),
            })}
            onClick={() => {
              onClickBaseList('pomodoro');
            }}
          >
            <i>{icons(6)}</i>
            <span>Pomodoro</span>
          </li>
        </Link>
      </ul>

      <hr />
      {!!userInfo && (
        <ul className="list">
          {lists &&
            lists.map((list) =>
              list.name !== 'Base' ? (
                <Link key={list.id} to={'/userList' + list.id}>
                  <li
                    key={list.id}
                    className={classNames({
                      active: selectedList && selectedList.id === list.id,
                    })}
                    onClick={() => onClickUserList(list)}
                  >
                    <i>{icons(8)}</i>
                    <span>{list.listName}</span>

                    <i>
                      <img
                        src={RemoveSVg}
                        onClick={() => removeConf(list)}
                        alt="remove"
                        className="remove-list"
                      />
                    </i>
                  </li>
                </Link>
              ) : (
                <span key={list.id} />
              ),
            )}
          <li key="addlist" onClick={changeFormVisibility}>
            <i>{icons(7)}</i>
            <span>Add List</span>
          </li>
        </ul>
      )}
      {!userInfo && (
        <ul className="list">
          <li key="addlist" onClick={changeFormVisibility}>
            <i>{icons(7)}</i>
            <span>Add List</span>
          </li>
        </ul>
      )}
    </nav>
  );
}
