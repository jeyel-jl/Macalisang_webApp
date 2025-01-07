import React from 'react';
import './ServicePage.css';
import Navbar from '../../components/Navbar/Nav';
import Footer from '../../components/Footer/Footer';

const ServicePage = () => {
  return (
    <div className="service-page">
      <Navbar />
      <div className="service-content">
        <h1>Our Services</h1>
        <p>
          At our company, we offer a variety of services designed to meet your
          needs. Whether you're a first-time customer or a loyal client, we’re
          here to help you with a range of high-quality, customized services.
        </p>
        <h2>Product Consultation</h2>
        <p>
          Our team of experts is here to guide you in selecting the best products
          for your needs. We provide personalized recommendations based on your
          preferences, ensuring you make an informed decision.
        </p>
        <h2>Fast and Secure Delivery</h2>
        <p>
          We prioritize delivering your products safely and quickly. Our delivery
          system is designed to ensure timely arrivals, and we use secure packaging
          to protect your items.
        </p>
        <h2>Customer Support</h2>
        <p>
          We believe in providing exceptional customer service. Whether you need
          help with placing an order or resolving an issue, our customer support
          team is here to assist you every step of the way.
        </p>
        <h2>Return and Exchange</h2>
        <p>
          Our return and exchange policy ensures that if you are not satisfied with
          your purchase, you can easily return or exchange it. We aim to make the
          process as hassle-free as possible.
        </p>
        <h2>Contact Us</h2>
        <p>
          For more information about our services or if you have specific
          requirements, feel free to get in touch with us through our contact form
          or by email at support@ourwebsite.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
