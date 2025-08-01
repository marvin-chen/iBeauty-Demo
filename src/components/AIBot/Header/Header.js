import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDemoUser } from '../../../context/DemoUserContext';
import './Header.css';

function Header() {
  const location = useLocation();
  const { currentDemoUser, switchDemoUser, getCurrentUserProfile, getAvailableDemoUsers } = useDemoUser();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentProfile = getCurrentUserProfile();
  const availableUsers = getAvailableDemoUsers();

  const handleUserSwitch = (userId) => {
    switchDemoUser(userId);
    setShowUserDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <span className="logo-text">iBeauty</span>
          </Link>
        </div>

        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/rewards" 
            className={`nav-link ${isActive('/rewards') ? 'nav-link-active' : ''}`}
          >
            Rewards
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
          >
            About
          </Link>
        </nav>

        <div className="header-right">
          <div 
            className="user-profile" 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            ref={dropdownRef}
          >
            <div className="user-avatar">
              <span><i className="fas fa-user"></i></span>
            </div>
            <div className="user-info">
              <span className="user-name">{currentProfile?.name || 'Demo User'}</span>
              <span className="user-status">{currentProfile?.membershipLevel || 'Premium'}</span>
            </div>
            <div className="dropdown-arrow">
              <i className={`fas fa-chevron-down ${showUserDropdown ? 'rotated' : ''}`}></i>
            </div>
            
            {showUserDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <span>Switch Demo User</span>
                </div>
                {availableUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`dropdown-item ${currentDemoUser === user.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserSwitch(user.id);
                    }}
                  >
                    <div className="user-dropdown-info">
                      <span className="dropdown-name">{user.name}</span>
                    </div>
                    {currentDemoUser === user.id && (
                      <i className="fas fa-check dropdown-check"></i>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
