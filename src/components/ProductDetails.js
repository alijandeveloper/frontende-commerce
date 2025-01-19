import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${match.params.id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [match.params.id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p> {/* Fixed reference to description */}
      <p>Price: ${product.price}</p> {/* Fixed reference to price */}
      <p>Rating: {product.rating}</p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        <button>Get Now</button>
      </a>
    </div>
  );
};

export default ProductDetails;
