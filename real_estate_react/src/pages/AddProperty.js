import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProperty.css';

function AddProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    // image: null
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Validate file type and size
  //     const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  //     if (!validTypes.includes(file.type)) {
  //       setError('Please upload a valid image (JPEG, PNG, JPG, GIF)');
  //       return;
  //     }
  //     if (file.size > 2 * 1024 * 1024) { // 2MB
  //       setError('Image size should be less than 2MB');
  //       return;
  //     }

  //     setFormData({ ...formData, image: file });
  //     setError('');
      
  //     // Create preview
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('price', formData.price);
      // formDataToSend.append('image', formData.image); // Single image upload

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/api/properties', {
        method: 'POST',
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {},
        body: formDataToSend
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add property');
      }

      alert('Property added successfully!');
      navigate('/properties');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-page-wrapper">
      <div className="add-property-container">
        <h2>Add New Property</h2>
        
        {error && <div className="error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              rows="5"
            />
          </div>

          {/* <div className="form-group">
            <label>Property Image</label>
            <input
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/jpg, image/gif"
              onChange={handleImageChange}
              required
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <p>Image Preview</p>
              </div>
            )}
          </div> */}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;