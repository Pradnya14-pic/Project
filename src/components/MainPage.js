// src/components/MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';

function MainPage() {
  return (
    <div className="main-page">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="login-link">Login</Link>
      </nav>

      <div className="main-content">
        <h1>Welcome to Agro Insights</h1>
        <p>Your intelligent agricultural dashboard for data-driven insights.</p>
        <Link to="/login" className="start-button">Get Started</Link>
      </div>
    </div>
  );
}

export default MainPage;
