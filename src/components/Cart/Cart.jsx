import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Cart.css'; // Import the CSS file
import Footer from '../../components/Footer/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("x-auth-token"); // Assuming your token is stored in localStorage
      try {
        const res = await fetch("http://localhost:3000/api/cart/get-cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Send the token in the request header
          },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setCartItems(data);
          calculateTotalAmount(data); // Calculate total amount after fetching items
        } else {
          setCartItems([]); // Set empty array if the data is not an array
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
        setCartItems([]); // Set empty array on error
      }
    };

    fetchCartItems();
  }, []);

  // Handle quantity update
  const updateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("x-auth-token");
  
    try {
      const res = await fetch("http://localhost:3000/api/cart/update-quantity", {
        method: "PATCH",
        body: JSON.stringify({ productId, quantity: newQuantity }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }
  
      const data = await res.json();
      if (Array.isArray(data)) {
        setCartItems(data);
        calculateTotalAmount(data); // Recalculate total after updating quantity
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  // Calculate total amount
  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart 🛒</h1>
      <Link to="/home">
        <button className="back-btn">Back</button>
      </Link>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        onClick={() => {
                          console.log("Product ID:", item.id, "Quantity:", item.quantity);
                          updateQuantity(item.id, item.quantity - 1);
                        }}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => {
                          console.log("Product ID:", item.id, "Quantity:", item.quantity);
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="total-amount">
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3> {/* Display total amount */}
      </div>
      <Link to="/checkout">
        <button className="checkout-btn">Proceed to Checkout</button>
      </Link>
      <Footer />
    </div>
  );     
};

export default Cart;
