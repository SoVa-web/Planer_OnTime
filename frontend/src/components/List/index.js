import React from 'react';
import classNames from 'classnames';
import './List.scss';
import axios from 'axios';

import ListSvg from '../../assets/list.svg';
import SunSvg from '../../assets/sun.svg';
import WeekSvg from '../../assets/week.svg';
import StarSvg from '../../assets/star.svg';
import HomeSvg from '../../assets/home.svg';
import CalendarSvg from '../../assets/calendar.svg';
import TomatoSvg from '../../assets/tomato.svg';
import PlusSvg from '../../assets/plus.svg';
import RemoveSVg from '../../assets/delete.svg';

export default function List({
  items,
  onClick,
  onClickList,
  isRemovable,
  onRemove,
  selectedList,
}) {
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

  return (
    <ul onClick={onClick} className="list">
      {items.map((item) => (
        <li
          key={item.id}
          className={classNames({
            active: selectedList && selectedList.id === item.id,
          })}
          onClick={onClickList ? () => onClickList(item) : null}
        >
          <i>{icons(item)}</i>
          <span>
            {item.name}
            {item.tasks && item.tasks.length > 0 && ` ${item.tasks.length}`}
          </span>
          {isRemovable && (
            <i>
              <img
                src={RemoveSVg}
                onClick={() => removeConf(item)}
                alt="remove"
                className="remove-list"
              />
            </i>
          )}
        </li>
      ))}
    </ul>
  );
}
