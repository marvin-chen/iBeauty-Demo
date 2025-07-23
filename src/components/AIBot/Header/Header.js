import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">iBeauty</span>
          </Link>
        </div>

        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            Dashboard
          </Link>
          <Link 
            to="/rewards" 
            className={`nav-link ${isActive('/rewards') ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🎁</span>
            Rewards
          </Link>
        </nav>

        <div className="header-right">
          <div className="user-profile">
            <div className="user-avatar">
              <span>👤</span>
            </div>
            <div className="user-info">
              <span className="user-name">Demo User</span>
              <span className="user-status">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
