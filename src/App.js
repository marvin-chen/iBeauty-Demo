import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DemoUserProvider } from './context/DemoUserContext';
import Header from './components/AIBot/Header/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BackToTop from './components/BackToTop/BackToTop';
import Dashboard from './pages/Dashboard/Dashboard';
import AreaDetail from './pages/AreaDetail/AreaDetail';
import About from './pages/About/About';
import Rewards from './pages/Rewards/Rewards';
import './App.css';

function App() {
  return (
    <DemoUserProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/area/:areaId" element={<AreaDetail />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <BackToTop />
        </div>
      </Router>
    </DemoUserProvider>
  );
}

export default App;
