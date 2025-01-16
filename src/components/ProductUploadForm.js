import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';


const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:5000/api/products/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: response.data.message });
    } catch (error) {
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
        <input type="file" name="image" onChange={handleChange} required />
        <button type="submit">Upload Product</button>
      </form>
      {message && (
        <p className={`upload-message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
};

export default ProductUploadForm;
