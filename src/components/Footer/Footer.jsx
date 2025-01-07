import React from "react";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"; // Social media icons from react-icons
import "./Footer.css"; // Make sure the correct path to CSS is used

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-social-icons">
        <div className="footer-social-icon-container">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaFacebook />
          </a>
        </div>
        <div className="footer-social-icon-container">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="footer-social-icon-container">
          <a
            href="https://github.com/jeyel-jl"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="footer-text">
        <p>&copy; 2025 FurEver Store. All rights reserved.</p>
        <p>Created by Jhon Laurence Macalisang</p>
      </div>
    </div>
  );
};

export default Footer;
