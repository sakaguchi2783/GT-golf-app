import React from 'react';
import { NavLink } from 'react-router-dom';
import './IconNavigation.css';

import homeIcon from '../assets/home.jpg';
import style4Icon from '../assets/style4.jpg';
import biorhythmIcon from '../assets/biorhythm.jpg';
import mypageIcon from '../assets/mypage.jpg';

const NavigationBar = () => {
  return (
    <div className="icon-navigation">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <img src={homeIcon} alt="ホーム" />
      </NavLink>
      <NavLink to="/style4" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <img src={style4Icon} alt="スタイル4診断" />
      </NavLink>
      <NavLink to="/biorhythm" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <img src={biorhythmIcon} alt="バイオリズム診断" />
      </NavLink>
      <NavLink to="/mypage" className={({ isActive }) => isActive ? 'nav-icon active' : 'nav-icon'}>
        <img src={mypageIcon} alt="マイページ" />
      </NavLink>
    </div>
  );
};

export default NavigationBar;
