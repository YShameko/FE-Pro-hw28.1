import React from "react";
import { NavLink } from "react-router-dom";
import './header.style.css';

export default function Header () {
    return <div className="app-header">
        <span className="logo-text">ToDo List app</span>
        <nav className="menu">
            <NavLink to='/' className="header-link"> main page </NavLink>
            <NavLink to='/about' className="header-link"> about </NavLink>
        </nav>
    </div>
}
