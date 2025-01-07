import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-parent">
        <div className="left-nav">
          <h1>FurEver 🛒</h1>
        </div>
        <div className="mid-nav">
          <Link to="/home"><p>Home</p></Link>
          <Link to="/about"><p>About</p></Link>
          <Link to="/service"><p>Service</p></Link>
          <Link to="/product"><p>Product</p></Link>
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
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Nav;
