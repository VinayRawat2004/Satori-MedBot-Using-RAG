import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="hero glass">
        {/* Added the logo back to the hero section */}
        <img src="/logo.png" alt="Satori Logo" className="hero-logo" />
        <h1 className="hero-title">SATORI</h1>
        <p className="hero-subtitle">
          Your personal AI Medical Assistant. Instant, intelligent, and private.
        </p>
        <div className="hero-buttons">
          <Link to="/chatbot" className="glass button-primary">
            ⚡ Ask Dr. Satori
          </Link>
          <Link to="/about" className="glass button-secondary">
            ✨ See the Magic
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="glass feature-card">
          <h3>10,000+ Pages Ingested</h3>
          <p>Trained on a vast corpus of medical literature for high accuracy.</p>
        </div>
        <div className="glass feature-card">
          <h3>Groq-Powered Speed</h3>
          <p>Answers in milliseconds. Faster than your doctor’s coffee break.</p>
        </div>
      </div>
    </div>
  );
}