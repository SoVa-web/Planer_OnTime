import React from 'react';
import './List.scss';

import ListSvg from '../../assets/list.svg';
import SunSvg from '../../assets/sun.svg';
import WeekSvg from '../../assets/week.svg';
import StarSvg from '../../assets/star.svg';
import HomeSvg from '../../assets/home.svg';
import CalendarSvg from '../../assets/calendar.svg';
import TomatoSvg from '../../assets/tomato.svg';

export default function List({ items }) {
  function icons(item) {
    if (item.id === 1) return <img src={SunSvg} alt="icon" />;
    else if (item.id === 2) return <img src={WeekSvg} alt="icon" />;
    else if (item.id === 3) return <img src={StarSvg} alt="icon" />;
    else if (item.id === 4) return <img src={HomeSvg} alt="icon" />;
    else if (item.id === 5) return <img src={CalendarSvg} alt="icon" />;
    else if (item.id === 6) return <img src={TomatoSvg} alt="icon" />;

    return <img src={ListSvg} alt="icon" />;
  }
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id}>
          <i>{icons(item)}</i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
