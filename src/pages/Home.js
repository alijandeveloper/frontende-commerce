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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="star filled">★</span>); // Full star
      } else if (rating > i - 1 && rating < i) {
        stars.push(<span key={i} className="star half-filled">★</span>); // Half star
      } else {
        stars.push(<span key={i} className="star">★</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-card-content">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <p className="rating">
              <span>Rating: </span>{renderStars(product.rating)} {/* Display stars */}
            </p>
            <div className='btnn'>
            <button onClick={() => window.open(product.link, '_blank')}>Get Now</button>
            <button onClick={() => alert(`Details of ${product.name}`)}>More Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
