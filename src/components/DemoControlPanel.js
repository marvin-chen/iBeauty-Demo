// Demo User Dropdown for L'Oréal iBeauty Demo Presentation
// Elegant dropdown control for switching between demo users during presentations

import React, { useState, useEffect } from 'react';
import { getDemoUserProfile, DEMO_USERS, enableDemoMode } from '../data/demoDataHelper';

const DemoControlPanel = ({ onUserSwitch }) => {
  // Get initial user from localStorage or default
  const getInitialUser = () => {
    try {
      const storedUser = localStorage.getItem('currentDemoUser');
      return storedUser || DEMO_USERS.current;
    } catch {
      return DEMO_USERS.current;
    }
  };

  const [currentUser, setCurrentUser] = useState(getInitialUser());
  const [userProfile, setUserProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Enable demo mode
    enableDemoMode();
    loadUserProfile(currentUser);
    
    // Sync with localStorage on mount
    const storedUser = getInitialUser();
    if (storedUser !== currentUser) {
      setCurrentUser(storedUser);
    }
  }, [currentUser]);

  const loadUserProfile = (userId) => {
    const profile = getDemoUserProfile(userId);
    setUserProfile(profile);
  };

  const switchUser = (userId) => {
    setCurrentUser(userId);
    setIsDropdownOpen(false);
    console.log(`🎪 Switching to demo user: ${userId}`);
    
    // Call the parent callback if provided
    if (onUserSwitch) {
      onUserSwitch(userId);
    }
  };

  const getUserDisplayName = (userId) => {
    switch(userId) {
      case DEMO_USERS.young_professional:
        return '👩‍💼 Sarah (28)';
      case DEMO_USERS.mature_antiaging:
        return '👩‍🦳 Maria (45)';
      case DEMO_USERS.sensitive_skin:
        return '🌸 Emma (32)';
      default:
        return '👤 Demo User';
    }
  };

  const getCurrentUserDescription = () => {
    if (!userProfile) return 'Demo Mode';
    return `${userProfile.skinType} skin, ${userProfile.membershipLevel} member`;
  };

  return (
    <div className="demo-user-dropdown" style={{
      position: 'fixed',
      top: '15px',
      right: '15px',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div 
        className="dropdown-trigger"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #D4A574 0%, #B8935A 100%)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          border: 'none',
          minWidth: '160px',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {getUserDisplayName(currentUser)}
          </span>
          <span style={{ fontSize: '11px', opacity: 0.9 }}>
            {getCurrentUserDescription()}
          </span>
        </div>
        <span style={{ 
          fontSize: '12px', 
          marginLeft: '8px',
          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </div>

      {isDropdownOpen && (
        <div 
          className="dropdown-menu"
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            minWidth: '200px',
            marginTop: '4px',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '8px 0' }}>
            <div 
              onClick={() => switchUser(DEMO_USERS.young_professional)}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: currentUser === DEMO_USERS.young_professional ? '#f8f9fa' : 'transparent',
                borderLeft: currentUser === DEMO_USERS.young_professional ? '3px solid #D4A574' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentUser !== DEMO_USERS.young_professional) {
                  e.target.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (currentUser !== DEMO_USERS.young_professional) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                  👩‍💼 Sarah Johnson
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  28 • Combination skin • Pore concerns
                </span>
                <span style={{ fontSize: '11px', color: '#D4A574', fontWeight: 'bold' }}>
                  6-Month Success Story
                </span>
              </div>
            </div>

            <div 
              onClick={() => switchUser(DEMO_USERS.mature_antiaging)}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: currentUser === DEMO_USERS.mature_antiaging ? '#f8f9fa' : 'transparent',
                borderLeft: currentUser === DEMO_USERS.mature_antiaging ? '3px solid #D4A574' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentUser !== DEMO_USERS.mature_antiaging) {
                  e.target.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (currentUser !== DEMO_USERS.mature_antiaging) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                  👩‍🦳 Maria Rodriguez
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  45 • Dry skin • Anti-aging focus
                </span>
                <span style={{ fontSize: '11px', color: '#D4A574', fontWeight: 'bold' }}>
                  Plateau-Breaking AI
                </span>
              </div>
            </div>

            <div 
              onClick={() => switchUser(DEMO_USERS.sensitive_skin)}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: currentUser === DEMO_USERS.sensitive_skin ? '#f8f9fa' : 'transparent',
                borderLeft: currentUser === DEMO_USERS.sensitive_skin ? '3px solid #D4A574' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentUser !== DEMO_USERS.sensitive_skin) {
                  e.target.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (currentUser !== DEMO_USERS.sensitive_skin) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                  🌸 Emma Chen
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  32 • Sensitive skin • Gentle progression
                </span>
                <span style={{ fontSize: '11px', color: '#D4A574', fontWeight: 'bold' }}>
                  Sensitive Algorithm
                </span>
              </div>
            </div>

            <div 
              onClick={() => switchUser(DEMO_USERS.current)}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: currentUser === DEMO_USERS.current ? '#f8f9fa' : 'transparent',
                borderLeft: currentUser === DEMO_USERS.current ? '3px solid #D4A574' : '3px solid transparent',
                borderTop: '1px solid #e0e0e0',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentUser !== DEMO_USERS.current) {
                  e.target.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (currentUser !== DEMO_USERS.current) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                  👤 Original Demo Data
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  Standard demo user
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default DemoControlPanel;
