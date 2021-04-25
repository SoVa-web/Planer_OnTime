import React from 'react';
import classNames from 'classnames';
import './List.scss';

import ListSvg from '../../assets/list.svg';
import SunSvg from '../../assets/sun.svg';
import WeekSvg from '../../assets/week.svg';
import StarSvg from '../../assets/star.svg';
import HomeSvg from '../../assets/home.svg';
import CalendarSvg from '../../assets/calendar.svg';
import TomatoSvg from '../../assets/tomato.svg';
import PlusSvg from '../../assets/plus.svg';
import RemoveSVg from '../../assets/delete.svg';

export default function List({ items, onClick, isRemovable, onRemove }) {
  function icons(item) {
    if (item.id === 1) return <img src={SunSvg} alt="icon" />;
    else if (item.id === 2) return <img src={WeekSvg} alt="icon" />;
    else if (item.id === 3) return <img src={StarSvg} alt="icon" />;
    else if (item.id === 4) return <img src={HomeSvg} alt="icon" />;
    else if (item.id === 5) return <img src={CalendarSvg} alt="icon" />;
    else if (item.id === 6) return <img src={TomatoSvg} alt="icon" />;
    else if (item.id === 7) return <img src={PlusSvg} alt="icon" />;

    return <img src={ListSvg} alt="icon" />;
  }

  function removeConf(item) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Do you really want to delete list ${item.name}?`))
      onRemove(item);
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item) => (
        <li key={item.id} className={classNames({ active: item.active })}>
          <i>{icons(item)}</i>
          <span>{item.name}</span>
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
