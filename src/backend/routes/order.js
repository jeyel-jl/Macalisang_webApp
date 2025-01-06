const express = require("express");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Place an order
router.post("/place-order", verifyToken, (req, res) => {
  const userId = req.user.userId;
  const { totalAmount } = req.body; // Get total amount from client-side
  const status = "Pending"; // Default status when placing an order

  // Create order
  Order.createOrder(userId, totalAmount, status, (err, result) => {
    if (err) {
      return res.status(500).send("Error placing order");
    }
    const orderId = result.insertId;

    // Get cart items and add them to order_items table
    Cart.getCart(userId, (err, cartItems) => {
      if (err) {
        return res.status(500).send("Error fetching cart items");
      }

      cartItems.forEach((item) => {
        OrderItem.createOrderItem(orderId, item.id, item.quantity, item.price, (err, result) => {
          if (err) {
            console.error("Error adding order item:", err);
          }
        });
      });

      // Clear the cart after order is placed
      Cart.clearCart(userId, (err, result) => {
        if (err) {
          return res.status(500).send("Error clearing cart");
        }
        res.status(200).send("Order placed successfully");
      });
    });
  });
});

// Get all orders for a user
router.get("/get-orders", verifyToken, (req, res) => {
  const userId = req.user.userId;

  Order.getUserOrders(userId, (err, orders) => {
    if (err) {
      return res.status(500).send("Error fetching orders");
    }
    res.json(orders);
  });
});

// Admin - Get all orders
router.get("/admin/get-all-orders", verifyToken, (req, res) => {
  Order.getAllOrders((err, orders) => {
    if (err) {
      return res.status(500).send("Error fetching orders");
    }
    res.json(orders);
  });
});

module.exports = router;
