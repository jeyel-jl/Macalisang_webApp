const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../config/authMiddleware");

const router = express.Router();

// Add product
router.post("/admin/add-product", (req, res) => {
  const { name, detail, category, price, company, image } = req.body;
  Product.create({ name, detail, category, price, company, image }, (err, result) => {
    if (err) {
      return res.status(500).send("Error adding product");
    }
    res.status(200).send("Product added successfully");
  });
});

// Get all products
router.get("/get-user-all-product", (req, res) => {

  Product.getAll((err, products) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Error fetching products", error: err.message });
    }

    if (!products || products.length === 0) {
      console.warn("No products found in the database.");
      return res.status(404).json({ message: "No products found" });
    }

    console.log("Products sent to client:", products);
    res.json(products);
  });
});

module.exports = router;
