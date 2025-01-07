import React, { useContext, useEffect } from 'react';
import './Viewproduct.css';
import Adminsidebar from '../Components/AdminSidebar/Adminsidebar';
import { useDispatch } from 'react-redux';
import { Appcontext } from '../../../Context/Appcontext';

const Viewproduct = () => {
  const { products, getProduct, deleteProduct } = useContext(Appcontext);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(); // Fetch product data on page load
  }, [getProduct]);

  console.log("Admin Products: ", products);

  const handleDelete = async (productId) => {
    // const updatedProducts = products.filter((product) => product.id !== productId); // Unused variable
    dispatch({ type: "DELETE_PRODUCT", payload: productId });
    try {
      // Make the API call to delete the product
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      // If the API call fails, revert the optimistic UI update
      dispatch({ type: "SET_API_DATA", payload: products });
    }
  };
  

  return (
    <>
      <div className="view-main">
        <Adminsidebar />
        <div className="view-content">
          <h1 className="view-heading">All Products</h1>
          <div className="table-container">
            {products?.length > 0 ? (
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.company}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1>No products found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewproduct;
