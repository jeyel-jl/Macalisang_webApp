const db = require("../config/db");

class Cart {

  static addToCart(userId, productId, quantity, callback) {
    // Check if the product already exists in the cart
    db.query(
      "SELECT * FROM carts WHERE userId = ? AND productId = ?",
      [userId, productId],
      (err, result) => {
        if (err) {
          console.error(`Database error in addToCart (userId: ${userId}, productId: ${productId}):`, err);
          return callback(err);
        }

        if (result.length > 0) {
          // If product exists, update quantity
          db.query(
            "UPDATE carts SET quantity = quantity + ? WHERE userId = ? AND productId = ?",
            [quantity, userId, productId],
            callback
          );
        } else {
          // If product does not exist, insert a new row
          db.query(
            "INSERT INTO carts (userId, productId, quantity) VALUES (?, ?, ?)",
            [userId, productId, quantity],
            callback
          );
        }
      }
    );
  }


    // Get all products in the user's cart with full product details
  static getCart(userId, callback) {
    db.query(
      "SELECT p.id, p.name, p.price, p.image, c.quantity FROM carts c JOIN products p ON c.productId = p.id WHERE c.userId = ?",
      [userId],
      callback
    );
  }

  static updateQuantity(userId, productId, quantity, callback) {
    db.query(
      "UPDATE carts SET quantity = ? WHERE userId = ? AND productId = ?",
      [quantity, userId, productId],
      (err, result) => {
        if (err) {
          console.error(
            `Error updating quantity (userId: ${userId}, productId: ${productId}):`,
            err
          );
          return callback(err);
        }
        // Fetch updated cart to return
        Cart.getCart(userId, callback);
      }
    );
  }
  


  // Remove product from the user's cart
  static removeFromCart(userId, productId, callback) {
    db.query(
      "DELETE FROM carts WHERE userId = ? AND productId = ?",
      [userId, productId],
      (err, result) => {
        if (err) {
          console.error(`Error removing product (userId: ${userId}, productId: ${productId}):`, err);
          return callback(err);
        }
  
        // Fetch updated cart to return
        Cart.getCart(userId, callback);
      }
    );
  }
  

}

module.exports = Cart;
