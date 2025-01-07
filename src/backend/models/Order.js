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
    db.query("SELECT * FROM orders", [userId], (err, orders) => {
      if (err) {
        return callback(err, null);
      }
  
      // For each order, fetch the associated order items
      const orderPromises = orders.map((order) => {
        return new Promise((resolve, reject) => {
          db.query("SELECT * FROM order_items WHERE orderId = ?", [order.id], (err, orderItems) => {
            if (err) {
              reject(err);
            }
            order.order_items = orderItems; // Add order items to the order object
            resolve(order);
          });
        });
      });
  
      Promise.all(orderPromises)
        .then((ordersWithItems) => {
          callback(null, ordersWithItems); // Pass orders with items to the callback
        })
        .catch((err) => {
          callback(err, null);
        });
    });
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
    db.query(
      "UPDATE order_items SET status = ? WHERE id = ?",
      [status, orderId],
      callback
    );
  }


}

module.exports = Order;
