const db = require("../config/db");

class Order {
  // Create an order
  static createOrder(userId, totalAmount, status, callback) {
    db.query(
      "INSERT INTO orders (userId, status, total_price, orderDate) VALUES (?, ?, ?, NOW())",
      [userId, status, totalAmount], 
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

  static updateOrderStatus(orderId, status, callback) {
    db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, orderId],
      callback
    );
  }

}

module.exports = Order;
