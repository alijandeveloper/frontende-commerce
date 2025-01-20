import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Use `useParams` instead of `match`
import '../styles/md.css';

const ProductDetails = () => {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.modeDescription}</p>
      <p>Price: ${product.price}</p>
      <div className="product-rating">
        <p>Rating: {renderStars(product.rating)}</p>
      </div>
      <div className="product-images">
        <img src={product.image} alt="Main" />
        {product.image2 && <img src={product.image2} alt="Secondary" />}
        {product.image3 && <img src={product.image3} alt="Tertiary" />}
      </div>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        <button>Get Now</button>
      </a>
    </div>
  );
};

export default ProductDetails;
