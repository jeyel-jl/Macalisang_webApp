const db = require("../config/db");

class Cart {
  // Add product to the user's cart
  static addToCart(userId, productId, quantity, callback) {
    db.query(
      "INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)",
      [userId, productId, quantity],
      callback
    );
  }

  // Get all products in the user's cart
  static getCart(userId, callback) {
    db.query(
      "SELECT p.*, c.quantity FROM carts c JOIN products p ON c.productId = p.id WHERE c.userId = ?",
      [userId],
      callback
    );
  }

  // Update quantity of a product in the user's cart
  static updateQuantity(userId, productId, quantity, callback) {
    db.query(
      "UPDATE carts SET quantity = ? WHERE userId = ? AND productId = ?",
      [quantity, userId, productId],
      callback
    );
  }

  // Remove product from the user's cart
  static removeFromCart(userId, productId, callback) {
    db.query("DELETE FROM carts WHERE userId = ? AND productId = ?", [userId, productId], callback);
  }

  // Clear the user's cart
  static clearCart(userId, callback) {
    db.query("DELETE FROM carts WHERE userId = ?", [userId], callback);
  }
}

module.exports = Cart;
