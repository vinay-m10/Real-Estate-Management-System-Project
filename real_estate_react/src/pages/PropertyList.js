import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/properties');
        if (!res.ok) throw new Error('Failed to fetch properties');
        const data = await res.json();
        setProperties(data);
        setFilteredProperties(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters
  useEffect(() => {
    let results = properties;
    
    if (minPrice) {
      results = results.filter(prop => prop.price >= Number(minPrice));
    }
    
    if (maxPrice) {
      results = results.filter(prop => prop.price <= Number(maxPrice));
    }
    
    if (locationFilter) {
      results = results.filter(prop => 
        prop.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    setFilteredProperties(results);
  }, [minPrice, maxPrice, locationFilter, properties]);

  return (
    <div className="property-page-wrapper">
      <div className="property-list-container">
        <h2 className="property-list-title">Available Properties</h2>
        
        {/* Filter Section */}
        <div className="property-filters">
          <div className="filter-group">
            <label>Min Price (₹)</label>
            <input 
              type="number" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
            />
          </div>
          
          <div className="filter-group">
            <label>Max Price (₹)</label>
            <input 
              type="number" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
            />
          </div>
          
          <div className="filter-group">
            <label>Location</label>
            <input 
              type="text" 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Search location"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading properties...</div>
        ) : error ? (
          <div className="error-message">⚠️ {error}</div>
        ) : filteredProperties.length === 0 ? (
          <div className="no-properties">No properties match your filters.</div>
        ) : (
          <div className="property-list-grid">
            {filteredProperties.map((prop) => (
              <div className="property-card" key={prop.id}>
                {prop.image && (
                  <img src={prop.image} alt={prop.title} className="property-image" />
                )}
                <div className="property-details">
                  <h3>{prop.title}</h3>
                  <p className="property-location">
                    <i className="fas fa-map-marker-alt"></i> {prop.location}
                  </p>
                  <p className="property-price">₹{prop.price.toLocaleString()}</p>
                  <div className="property-features">
                    {prop.bedrooms && <span><i className="fas fa-bed"></i> {prop.bedrooms}</span>}
                    {prop.bathrooms && <span><i className="fas fa-bath"></i> {prop.bathrooms}</span>}
                    {prop.area && <span><i className="fas fa-ruler-combined"></i> {prop.area} sqft</span>}
                  </div>
                  <Link to={`/properties/${prop.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyList;