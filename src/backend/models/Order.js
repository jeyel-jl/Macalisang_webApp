const db = require("../config/db");

class Order {
  // Create an order
  static createOrder(userId, totalAmount, status, callback) {
    db.query(
      "INSERT INTO orders (userId, totalAmount, status) VALUES (?, ?, ?)",
      [userId, totalAmount, status],
      callback
    );
  }

  // Get orders for a user
  static getUserOrders(userId, callback) {
    db.query("SELECT * FROM orders WHERE userId = ?", [userId], callback);
  }

  // Get all orders (admin access)
  static getAllOrders(callback) {
    db.query("SELECT * FROM orders", callback);
  }

  // Get order by ID
  static getOrderById(orderId, callback) {
    db.query("SELECT * FROM orders WHERE id = ?", [orderId], callback);
  }
}

module.exports = Order;
