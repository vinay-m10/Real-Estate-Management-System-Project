import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Real Estate Portal</h1>
      <p>
        Find your dream home or list your property easily and quickly. Browse from a wide range of verified listings across cities.
      </p>
      <Link to="/properties">
        <button className="view-properties-btn">View Properties</button>
      </Link>
    </div>
  );
}

export default Home;
