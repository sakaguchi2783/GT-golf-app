import React from 'react';
import { NavLink } from 'react-router-dom';
import './IconNavigation.css';

// Importing icons
import homeIcon from '../assets/home.jpg';
import style4Icon from '../assets/style4.jpg';
import biorhythmIcon from '../assets/biorhythm.jpg';
import mypageIcon from '../assets/mypage.jpg';

const NavigationBar = () => {
  return (
    <div className="icon-navigation">
      <NavLink to="/" className="nav-icon" activeClassName="active">
        <img src={homeIcon} alt="ホーム" />
      </NavLink>
      <NavLink to="/style4" className="nav-icon" activeClassName="active">
        <img src={style4Icon} alt="スタイル4診断" />
      </NavLink>
      <NavLink to="/biorhythm" className="nav-icon" activeClassName="active">
        <img src={biorhythmIcon} alt="バイオリズム診断" />
      </NavLink>
      <NavLink to="/mypage" className="nav-icon" activeClassName="active">
        <img src={mypageIcon} alt="マイページ" />
      </NavLink>
    </div>
  );
};

export default NavigationBar;
