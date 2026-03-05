import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Optional: for custom styling

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem('user');
    alert('👋 Logged out successfully');
    navigate('/');
  };

  return (
    <header className="header">
      <h1>🏠 Real Estate Portal</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>

        {/* ✅ Only show to admin */}
        {user?.role === 'admin' && <Link to="/add-property">Add Property</Link>}

        <Link to="/contact">Contact</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
