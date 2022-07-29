import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
   const [token, setToken] = useState(localStorage.getItem("token"));
   return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
         <NavLink className={({ isActive }) => (isActive ? "navbar-brand text-warning active" : "navbar-brand ")} to="/">Restoranų kūrimo aplikacija</NavLink>
         <div className="navbar-collapse d-inline">
            {token
               ? <ul className="navbar-nav ">  <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/restaurants">Restoranai</NavLink></li>
                  <li className=" "><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/dishes">Patiekalai</NavLink></li></ul>
               : <ul className="navbar-nav"><li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/login">LogIn</NavLink></li>   <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/register">Registruotis</NavLink></li></ul>}
         </div>
         <div>
            {token?<button className='btn btn-danger m-1 ' onClick={(e) => { setToken(localStorage.removeItem('token')); window.location.href = '/login' }} >Atsijungti</button>:""}
            </div>
      </nav>
   )
}

export default Header;
