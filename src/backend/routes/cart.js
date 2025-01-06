const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Add product to the cart
router.post("/add-to-cart", verifyToken, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // Get user ID from JWT token

  Cart.addToCart(userId, productId, quantity, (err, result) => {
    if (err) {
      return res.status(500).send("Error adding product to cart");
    }
    res.status(200).send("Product added to cart");
  });
});

// Get products in the user's cart
router.get("/get-cart", verifyToken, (req, res) => {
  const userId = req.user.userId;

  Cart.getCart(userId, (err, products) => {
    if (err) {
      return res.status(500).send("Error fetching cart");
    }
    res.json(products);
  });
});

// Remove product from the cart
router.delete("/remove-from-cart", verifyToken, (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  Cart.removeFromCart(userId, productId, (err, result) => {
    if (err) {
      return res.status(500).send("Error removing product from cart");
    }
    res.status(200).send("Product removed from cart");
  });
});

module.exports = router;
