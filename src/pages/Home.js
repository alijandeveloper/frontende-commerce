import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-card-content">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.modeDescription}</p> {/* Display mode description */}
            <p className="price">${product.price}</p>
            <button
              className="link-button"
              onClick={() => window.open(product.link, '_blank')} // Open product link in new tab
            >
              View Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
