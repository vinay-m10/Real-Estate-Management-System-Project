import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PropertyDetail.css';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/properties/${id}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleContactClick = () => {
    navigate('/contact');
  };

  if (loading) return (
    <div className="property-detail-loading">
      <div className="loading-spinner"></div>
      <p>Loading property details...</p>
    </div>
  );

  if (error) return (
    <div className="property-detail-error">
      <p>⚠️ {error}</p>
      <Link to="/properties" className="back-button">Back to Properties</Link>
    </div>
  );

  if (!property) return (
    <div className="property-detail-error">
      <p>Property not found</p>
      <Link to="/properties" className="back-button">Back to Properties</Link>
    </div>
  );

  return (
    <div className="property-detail-page">
      <div className="property-detail-container">
        <div className="property-header">
          <h1>{property.title}</h1>
          <div className="property-meta">
            <span className="location">
              <i className="fas fa-map-marker-alt"></i> {property.location}
            </span>
            <span className="price">₹{property.price.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Image Gallery Section - Added */}
        {/* {property.images && property.images.length > 0 && (
          <div className="property-images-section">
            <div className="main-image">
              <img 
                src={`http://localhost:8000${property.images[0]}`} 
                alt={property.title} 
              />
            </div>
            {property.images.length > 1 && (
              <div className="thumbnail-container">
                {property.images.slice(1).map((image, index) => (
                  <div key={index} className="thumbnail">
                    <img 
                      src={`http://localhost:8000${image}`} 
                      alt={`${property.title} - ${index + 2}`} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )} */}

        <div className="property-description-section">
          <div className="description-card">
            <h2><i className="fas fa-info-circle"></i> Property Description</h2>
            <p>{property.description}</p>
          </div>
        </div>

        <div className="property-actions">
          <button className="contact-btn" onClick={handleContactClick}>
            <i className="fas fa-envelope"></i> Contact Us
          </button>
          <Link to="/properties" className="back-btn">
            <i className="fas fa-arrow-left"></i> Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;