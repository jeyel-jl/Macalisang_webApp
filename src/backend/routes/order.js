const express = require("express");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItems");
const Cart = require("../models/Cart");
const verifyToken = require("../config/authMiddleware");

const router = express.Router();

router.post("/place-order", verifyToken, (req, res) => {
  const userId = req.userId;
  const { totalAmount } = req.body; // Get total amount from client-side
  const status = "Pending"; // Default status when placing an order

  // Fetch cart items
  Cart.getCart(userId, (err, cartItems) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json("Error fetching cart items");
    }

    if (cartItems.length === 0) {
      return res.status(400).json("Cart is empty");
    }

    // Create order with status "Pending"
    Order.createOrder(userId, totalAmount, status, (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        return res.status(500).json("Error placing order");
      }

      const orderId = result.insertId; // Get the new order's ID

      // Insert each cart item into the order_items table
      cartItems.forEach((item) => {
        OrderItem.createOrderItem(orderId, item.id, item.quantity, item.price, (err) => {
          if (err) {
            console.error("Error inserting order item:", err);
          }
        });
      });

      // Optionally, clear the cart after the order is placed
      Cart.removeFromCart(userId, (err) => {
        if (err) {
          console.error("Error clearing cart:", err);
        }
      });

      res.status(200).json({ message: "Order placed successfully", orderId });
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
    console.log("Fetched orders:", orders); // Log fetched orders to check the data structure
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
router.patch("/update-order-status", (req, res) => {
  const { orderId, status } = req.body;
  console.log('Received orderId:', orderId, 'status:', status);  // Log received data

  if (!["Pending", "To Ship", "Delivered"].includes(status)) {
    console.log("Invalid status:", status);
    return res.status(400).json({ message: "Invalid status" });
  }

  Order.updateOrderStatus(orderId, status, (err, result) => {
    if (err) {
      console.log('Error updating order status:', err);  // Log the error
      return res.status(500).json({ message: "Error updating order status" });
    }
    console.log("Order status updated successfully");
    res.status(200).json({ message: "Order status updated successfully" });
  });
});



module.exports = router;
