import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>ホーム</NavLink>
      <NavLink to="/style4" className={({ isActive }) => (isActive ? 'active' : '')}>スタイル４診断</NavLink>
      <NavLink to="/biorhythm" className={({ isActive }) => (isActive ? 'active' : '')}>バイオリズム診断</NavLink>
      <NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>マイページ</NavLink>
    </div>
  );
};

export default NavigationBar;
