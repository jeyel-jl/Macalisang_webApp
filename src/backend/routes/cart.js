const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../config/authMiddleware");

const router = express.Router();

// Add product to the cart
router.post("/add-to-cart", verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId; // Get user ID from JWT token

  Cart.addToCart(userId, productId, quantity, (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json("Error adding product to cart");
    }
    res.status(200).json("Product added to cart");
  });
});


router.get("/get-cart", verifyToken, (req, res) => {
  const userId = req.userId;

  Cart.getCart(userId, (err, products) => {
    if (err) {
      return res.status(500).json("Error fetching cart");
    }
    res.json(products);
  });
});

// In your cart routes:
router.patch("/update-quantity", verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  if (quantity <= 0) {
    Cart.removeFromCart(userId, productId, (err, updatedCart) => {
      if (err) {
        return res.status(500).json("Error removing product from cart");
      }
      res.status(200).json(updatedCart);
    });
  } else {
    Cart.updateQuantity(userId, productId, quantity, (err) => {
      if (err) {
        return res.status(500).json("Error updating quantity");
      }
      Cart.getCart(userId, (err, updatedCart) => {
        if (err) {
          return res.status(500).json("Error fetching updated cart");
        }
        res.status(200).json(updatedCart);
      });
    });
  }
});

router.post("/place-order", verifyToken, (req, res) => {
  const userId = req.userId;

  // Fetch cart items
  db.query("SELECT * FROM carts WHERE userId = ?", [userId], (err, cartItems) => {
    if (err) {
      return res.status(500).json("Error fetching cart items");
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      return res.status(400).json("Cart is empty");
    }

    // Insert a new order with status "Pending"
    db.query(
      "INSERT INTO orders (userId, status, orderDate) VALUES (?, ?, NOW())",
      [userId, 'Pending'], // Default status is "Pending"
      (err, result) => {
        if (err) {
          return res.status(500).json("Error placing order");
        }

        const orderId = result.insertId; // Get the new order's ID

        // Insert each cart item into the order_items table
        cartItems.forEach((item) => {
          db.query(
            "INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
            [orderId, item.productId, item.quantity, item.price],
            (err) => {
              if (err) {
                console.error("Error inserting order item:", err);
              }
            }
          );
        });

        // Optionally, remove cart items after the order is placed
        //db.query("DELETE FROM carts WHERE userId = ?", [userId]);

        res.status(200).json({ message: "Order placed successfully", orderId });
      }
    );
  });
});



router.delete("/remove-from-cart", verifyToken, (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;

  Cart.removeFromCart(userId, productId, (err, result) => {
    if (err) {
      return res.status(500).json("Error removing product from cart");
    }
    res.status(200).json("Product removed from cart");
  });
});


module.exports = router;
