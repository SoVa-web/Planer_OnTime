import React from 'react';
import './Header.scss';

import UserImg from '../../assets/ava.jpg';
import TriangleSvg from '../../assets/yield1.svg';

export default function Header() {
  const [isVisibleForm, setFormVisibility] = React.useState(false);

  function showMenu() {
    setFormVisibility(!isVisibleForm);
  }

  return (
    <>
      <div className="header">
        <p className="header__logo">On Time</p>
        <div className="header__user">
          <img src={UserImg} alt="user" className="user-image" />
          <img
            src={TriangleSvg}
            alt="menu"
            className="menu-image"
            onClick={showMenu}
          />
        </div>
      </div>
      {isVisibleForm && (
        <div className="menu">
          <ul className="menu__ul">
            <li>Account</li>
            <li>Pomo settings</li>
          </ul>
        </div>
      )}
    </>
  );
}
