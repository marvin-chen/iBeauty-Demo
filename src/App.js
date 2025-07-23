import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/AIBot/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import AreaDetail from './pages/AreaDetail/AreaDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/area/:areaId" element={<AreaDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
