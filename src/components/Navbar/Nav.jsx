import React, { useState } from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Only navigate to SearchPage if the searchQuery is not empty
      navigate(`/SearchPage?query=${searchQuery}`);
    }
  };

  return (
    <div className="nav-container">
      <div className="nav-parent">
        <div className="left-nav">
          <h1>FurEver 🛒</h1>
        </div>
        <div className="mid-nav">
          <Link to="/home"><p>Home</p></Link>
          <Link to="/AboutPage"><p>About</p></Link>
          <Link to="/ServicePage"><p>Service</p></Link>
          <Link to="/ProductPage"><p>Product</p></Link>
        </div>
        <div className="right-nav">
          <Link to="/Cart"><p>Go To Cart</p></Link>
          {localStorage.getItem('x-auth-token') ? (
            <Link to="/Auth" onClick={() => localStorage.removeItem('x-auth-token')}>
              <p>Logout</p>
            </Link>
          ) : (
            <Link to="/Auth"><p>Get Started</p></Link>
          )}
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Nav;
