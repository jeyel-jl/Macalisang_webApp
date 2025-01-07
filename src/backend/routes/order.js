const express = require("express");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Place an order
router.post("/place-order", verifyToken, (req, res) => {
  const userId = req.userId;
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
  const userId = req.userId;

  Order.getUserOrders(userId, (err, orders) => {
    if (err) {
      return res.status(500).send("Error fetching orders");
    }
    res.json(orders);
  });
});

// Admin - Get all orders
router.get("/admin/get-all-orders", verifyToken, (req, res) => {
  // Ensure only admin can fetch all orders
  const userId = req.userId;

  if (!isAdmin(userId)) {
    return res.status(403).json({ message: "You are not authorized to view all orders" });
  }

  Order.getAllOrders((err, orders) => {
    if (err) {
      return res.status(500).send("Error fetching orders");
    }

    // Fetch order items for each order
    const orderPromises = orders.map((order) => {
      return new Promise((resolve, reject) => {
        OrderItem.getOrderItems(order.id, (err, orderItems) => {
          if (err) {
            reject(err);
          }
          order.order_items = orderItems;
          resolve(order);
        });
      });
    });

    Promise.all(orderPromises)
      .then((ordersWithItems) => {
        res.json(ordersWithItems);
      })
      .catch((err) => {
        res.status(500).send("Error fetching order items");
      });
  });
});

// Admin route to update order status
router.patch("/update-order-status", verifyToken, (req, res) => {
  const { orderId, status } = req.body;
  const userId = req.userId;

  // Ensure only admin can update status
  if (!isAdmin(userId)) {
    return res.status(403).json({ message: "You are not authorized to update the status" });
  }

  // Validate the status value
  if (!["Pending", "To Ship", "Delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  // Update the order status
  Order.updateOrderStatus(orderId, status, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating order status" });
    }
    res.status(200).json({ message: "Order status updated successfully" });
    }
  );
});


module.exports = router;
