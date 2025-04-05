import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Search from './Search';
import About from './About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Left sidebar navigation */}
        <Sidebar />
        
        {/* Main content area */}
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;