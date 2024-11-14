// src/components/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import Dashboard from './Dashboard';
import About from './About';
import Contact from './Contact';
import '../styles/App.css';
import '../styles/Global.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
