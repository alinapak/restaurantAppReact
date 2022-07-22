import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-dark bg-dark">
    <NavLink className={({ isActive }) => (isActive ? "navbar-brand text-warning active" : "navbar-brand ")} to="/">Restoranų kūrimo aplikacija</NavLink>
    <div className="navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/restorans">Restoranai</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/dishes">Patiekalai</NavLink></li>
      </ul>
    </div>
  </nav>

);

export default Header;
