import './SearchPage.css';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Appcontext } from '../../Context/Appcontext';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Nav';
import Footer from '../../components/Footer/Footer';

const SearchPage = () => {
  const { isLoading, products } = useContext(Appcontext);
  const location = useLocation();

  // Get the search query from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || ''; // Default to empty if no query in URL

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (searchQuery) {
      // Filter products based on the search query
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      // Show all products if no search query is provided
      setFilteredProducts(products);
    }
  }, [searchQuery, products]); // Re-run when searchQuery or products change

  if (isLoading) {
    return <div>Please wait, loading...</div>;
  }

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-heading">
        <h1>Search Results</h1>
      </div>
      <div className="search-main">
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map((curr, index) => (
              <Card key={index + 1} {...curr} />
            ))
          ) : (
            <h2>No products found</h2>
          )
        }
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
