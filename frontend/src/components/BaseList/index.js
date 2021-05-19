import React from 'react';
import classNames from 'classnames';
import './BaseList.scss';
// import axios from 'axios';
import { Link } from 'react-router-dom';

// import ListSvg from '../../assets/list.svg';
import SunSvg from '../../assets/sun.svg';
import WeekSvg from '../../assets/week.svg';
import StarSvg from '../../assets/star.svg';
import HomeSvg from '../../assets/home.svg';
import CalendarSvg from '../../assets/calendar.svg';
import TomatoSvg from '../../assets/tomato.svg';
// import PlusSvg from '../../assets/plus.svg';
// import RemoveSVg from '../../assets/delete.svg';

export default function List({
  items,
  // isBase,
  onClickList,
  // isRemovable,
  // onRemove,
  selectedList,
}) {
  /*
  function icons(item) {
    switch (item.id) {
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
*/
  const sList = items.find((item) => item.name === 'Base');

  return (
    <ul className="list">
      <Link to="/today">
        <li
          key="b1"
          className={classNames({
            active: selectedList && selectedList.id === 'b1',
          })}
        >
          <i>
            <img src={SunSvg} alt="icon" />
          </i>
          <span>Today</span>
        </li>
      </Link>

      <Link to="/week" onClick={() => onClickList(sList)}>
        <li
          key="b2"
          className={classNames({
            active: selectedList && selectedList.id === 'b2',
          })}
        >
          <i>
            <img src={WeekSvg} alt="icon" />
          </i>
          <span>Week</span>
        </li>
      </Link>

      <Link to="/important" onClick={() => onClickList(sList)}>
        <li
          key="b3"
          className={classNames({
            active: selectedList && selectedList.id === 'b3',
          })}
        >
          <i>
            <img src={StarSvg} alt="icon" />
          </i>
          <span>Important</span>
        </li>
      </Link>
      <Link to="/affairs" onClick={() => onClickList(sList)}>
        <li
          key="b4"
          className={classNames({
            active: selectedList && selectedList.id === 'b4',
          })}
        >
          <i>
            <img src={HomeSvg} alt="icon" />
          </i>
          <span>Affairs</span>
        </li>
      </Link>

      <Link to="/planned" onClick={() => onClickList(sList)}>
        <li
          key="b5"
          className={classNames({
            active: selectedList && selectedList.id === 'b5',
          })}
        >
          <i>
            <img src={CalendarSvg} alt="icon" />
          </i>
          <span>Planned</span>
        </li>
      </Link>

      <Link to="/pomodoro" onClick={() => onClickList(sList)}>
        <li
          key="b6"
          className={classNames({
            active: selectedList && selectedList.id === 'b6',
          })}
        >
          <i>
            <img src={TomatoSvg} alt="icon" />
          </i>
          <span>Pomodoro</span>
        </li>
      </Link>
    </ul>
  );
}
