import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Brewpedia</h2>
      <ul>
        <li>
          <Link to="/dashboard">🏠Dashboard</Link>
        </li>
        <li>
          <Link to="/search">🔍Search</Link>
        </li>
        <li>
          <Link to="/about">ℹAbout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;