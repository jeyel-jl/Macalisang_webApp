import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("x-auth-token");
    try {
      await fetch("http://localhost:3000/api/cart/remove-from-cart", {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, // Send the token in the request header
        },
      });
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
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // Handle quantity update
  const updateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("x-auth-token");

    // If quantity is less than or equal to 0, remove the item
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/cart/update-quantity", {
        method: "PATCH",
        body: JSON.stringify({ productId, quantity: newQuantity }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart 🛒</h1>
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
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
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
      <Link to="/checkout">
        <button className="checkout-btn">Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
