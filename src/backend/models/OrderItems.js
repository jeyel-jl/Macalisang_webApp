const db = require("../config/db");

class OrderItem {
  // Add product to order items
  static createOrderItem(orderId, productId, quantity, price, callback) {
    db.query(
      "INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, price],
      callback
    );
  }

  // Get order items by order ID
  static getOrderItems(orderId, callback) {
    db.query("SELECT * FROM order_items WHERE orderId = ?", [orderId], callback);
  }
}

module.exports = OrderItem;
