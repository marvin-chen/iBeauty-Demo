// src/context/AppContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  skinData: null,
  isLoading: false,
  error: null,
  notifications: [],
  theme: 'light'
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SKIN_DATA':
      return { ...state, skinData: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    setSkinData: (data) => dispatch({ type: 'SET_SKIN_DATA', payload: data }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    addNotification: (notification) => dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { ...notification, id: Date.now() } 
    }),
    removeNotification: (id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
