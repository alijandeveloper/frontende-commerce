import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    return stars;
  };

  const categories = [
    'Electronics', 'Fashion', 'Home Appliances', 'Books', 
    'Beauty & Health', 'Sports', 'Toys', 'Automotive', 
    'Groceries', 'Others',
  ];

  return (
    <div>
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="products-container">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-card-content">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                    <p className="rating">
                      <span>Rating: </span>{renderStars(product.rating)}
                    </p>
                    <div className="btnn">
                      <button onClick={() => window.open(product.link, '_blank')}>Get Now</button>
                      <Link to={`/product/${product._id}`}>
                        <button>More Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
