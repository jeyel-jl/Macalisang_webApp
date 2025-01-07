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
  const userId = req.user.userId;

  if (quantity <= 0) {
    // Remove the product if quantity is 0 or less
    Cart.removeFromCart(userId, productId, (err, result) => {
      if (err) {
        return res.status(500).json("Error removing product from cart");
      }
      res.status(200).json(result); // Return updated cart items
    });
  } else {
    // Otherwise, update the quantity
    Cart.updateQuantity(userId, productId, quantity, (err, result) => {
      if (err) {
        return res.status(500).json("Error updating quantity");
      }
      res.status(200).json(result); // Return updated cart items
    });
  }
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
