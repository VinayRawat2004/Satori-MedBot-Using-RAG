import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import './Navbar.css';

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar glass"> {/* Added .glass class for consistent glassy effect */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="Satori Logo" className="logo-img" />
          Satori
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <select value={theme} onChange={(e) => setTheme(e.target.value)} className="theme-toggle">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="glassy">Glassy</option>
      </select>
    </nav>
  );
}
export default Navbar;