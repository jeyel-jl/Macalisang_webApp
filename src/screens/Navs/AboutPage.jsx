import React from 'react';
import './AboutPage.css';
import Navbar from '../../components/Navbar/Nav';
import Footer from '../../components/Footer/Footer';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our website! We are a team of passionate individuals
          dedicated to providing high-quality products and excellent customer
          service. Our mission is to offer a seamless shopping experience and
          help you find the best products at great prices.
        </p>
        <p>
          Our team works hard to curate a selection of items that are both
          innovative and affordable. Whether you're looking for something trendy
          or timeless, we've got something for everyone.
        </p>
        <h2>Our Vision</h2>
        <p>
          To become the go-to destination for all your shopping needs, where
          convenience, quality, and customer satisfaction are at the forefront.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have any questions? Feel free to reach out to us through our contact
          form or by email at support@ourwebsite.com. We’d love to hear from
          you!
        </p>
      </div>
      //<Footer />
    </div>
  );
};

export default AboutPage;
