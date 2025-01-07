import './ProductPage.css';
import React, { useContext } from 'react'
import { Appcontext } from '../../Context/Appcontext';
import Card from '../../components/Card/Card'; 
import Navbar from '../../components/Navbar/Nav'; 
import Footer from '../../components/Footer/Footer'; 

const ProductsPage = () => {
    const {isLoading , products} = useContext(Appcontext);

    if(isLoading){
      return <div>Please wait loading</div>
    }

  return (
    <div className="products-page">
      <Navbar />
            <div className="f-heading">
                <h1>Checkout All our Products</h1>
            </div>
            <div className="f-main">
                {
                    products.map((curr , index)=>{
                    return <Card key={index+1} {...curr}  />;
                    })
                }
            </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
