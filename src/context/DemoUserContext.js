// Demo User Context for L'Oréal iBeauty Demo
// Manages demo user state across all pages and components

import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_PROFILES } from '../data/enhancedMockData';
import { clearUserGoals } from '../data/demoDataHelper';

const DemoUserContext = createContext();

export const useDemoUser = () => {
  const context = useContext(DemoUserContext);
  if (!context) {
    throw new Error('useDemoUser must be used within a DemoUserProvider');
  }
  return context;
};

export const DemoUserProvider = ({ children }) => {
  const [currentDemoUser, setCurrentDemoUser] = useState(null);

  // Get initial demo user from localStorage or default to User 1
  const getInitialDemoUser = () => {
    try {
      const storedUser = localStorage.getItem('currentDemoUser');
      if (storedUser && USER_PROFILES[storedUser]) {
        return storedUser;
      }
    } catch (error) {
      console.log('Error reading from localStorage:', error);
    }
    // Default to User 1 for enhanced demo experience
    return 'user1';
  };

  // Initialize demo user on mount
  useEffect(() => {
    const initialUser = getInitialDemoUser();
    setCurrentDemoUser(initialUser);
    
    // Clear any persisted goals on page refresh to start fresh
    if (initialUser) {
      clearUserGoals(initialUser);
      console.log(`🗑️ Cleared AI goals for ${initialUser} on page refresh`);
    }
  }, []);

  // Switch demo user and persist to localStorage
  const switchDemoUser = (userId) => {
    if (USER_PROFILES[userId]) {
      // Clear goals for the new user to start fresh
      clearUserGoals(userId);
      
      setCurrentDemoUser(userId);
      localStorage.setItem('currentDemoUser', userId);
      console.log(`🎪 Demo user switched to: ${userId} (goals cleared)`);
    } else {
      console.error('Invalid demo user ID:', userId);
    }
  };

  // Get current user profile
  const getCurrentUserProfile = () => {
    return USER_PROFILES[currentDemoUser];
  };

  // Get available demo users for dropdown
  const getAvailableDemoUsers = () => {
    return Object.entries(USER_PROFILES).map(([userId, profile]) => ({
      id: userId,
      name: profile.name,
      membershipLevel: profile.membershipLevel,
      skinType: profile.skinType,
      age: profile.age
    }));
  };

  const value = {
    currentDemoUser,
    setCurrentDemoUser,
    switchDemoUser,
    getCurrentUserProfile,
    getAvailableDemoUsers
  };

  return (
    <DemoUserContext.Provider value={value}>
      {children}
    </DemoUserContext.Provider>
  );
};

export default DemoUserContext;
