import React from 'react';
import './Header.css';
import image from '../Header/dog.png';

const Header = () => {
  return (
    <div className="header">
      <div className="left-header">
        <h1>Grab Upto 50% off on</h1>
        <h1>Selected products</h1>
        <p>We are the world's best pet online store and nominated for best serving agency across the world, so trust us for better quality.</p>
        <div className="check-button-container">
          <p className="check-button">Check Now 🛍️</p>
        </div>
      </div>
      
      <div className="right-header">
        <img src={image} alt="main" />
      </div>
    </div>
  );
};

export default Header;
