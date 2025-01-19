import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    link: '',
    modeDescription: '',
    rating: '', 
    image: null,
    image2: null,
    image3: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith('image')) {
      setFormData({ ...formData, [name]: files[0] });  // Store the file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Create FormData to send the form data and files
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      // Sending the POST request to upload the product
      const response = await axios.post('http://localhost:5000/api/products/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct Content-Type for file uploads
        },
      });

      setMessage({ type: 'success', text: response.data.message });
    } catch (error) {
      // Handle errors and display appropriate message
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Upload failed',
      });
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          required
        />
        <textarea
          name="modeDescription"
          placeholder="Mode Description"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Product Rating (1-5)"
          onChange={handleChange}
          min="1"
          max="5"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Product Link"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          onChange={handleChange}
          required
        />
        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>
        
        {/* Image File Inputs */}
        <input type="file" name="image" onChange={handleChange} />
        <input type="file" name="image2" onChange={handleChange} />
        <input type="file" name="image3" onChange={handleChange} />

        <button type="submit">Upload Product</button>
      </form>
      {message && (
        <p className={`upload-message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
};

export default ProductUploadForm;
