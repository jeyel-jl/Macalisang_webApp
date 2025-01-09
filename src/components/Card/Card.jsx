import React, { useState } from 'react';
import './Card.css';
import { NavLink } from 'react-router-dom';

const Card = ({ id, name, image, category, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('x-auth-token'); 

    if (!token) {
      alert("Please log in to add items to your cart.");
      console.log('No token found in localStorage');
      return;
    }

    const data = {
      productId: id,
      quantity: quantity,
    };

    try {
      const response = await fetch('http://localhost:3000/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,  // Pass token in the headers
        },
        body: JSON.stringify(data),  // Send the product and quantity as JSON
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Product added to cart', responseData);
        alert('Product added to cart');
      } else {
        throw new Error('Error adding to cart');
      }
    } catch (error) {
      console.error('Error adding to cart', error);
      alert('Error adding to cart');
    }
  };

  return (
    <div className="card">
      <NavLink to={`singleproduct/${id}`}>
        <div className="card-image">
          <img 
            src={image} 
            alt={name || 'Product'} 
          />
        </div>
      </NavLink>
      <div className="card-text">
        <div className="up-text">
          <h1>{name}</h1>
          <h2>Php {price}</h2>
        </div>
        <p className="detail">{category}</p>

        <div className="buttons-container">
          <div className="cart-button" onClick={handleAddToCart}>
            <span>Add To Cart 👉</span>
          </div>

          <div 
            className="favorite-button" 
            onClick={handleFavoriteClick}
          >
            <span className={`heart-icon ${isFavorite ? 'clicked' : ''}`}>
              {isFavorite ? '❤️' : '🤍'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
