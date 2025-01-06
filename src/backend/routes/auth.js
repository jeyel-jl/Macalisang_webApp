const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Registration Route
router.post("/register", (req, res) => {
  const { username, email, password, category } = req.body;

  // Validation: Check if all fields are provided
  if (!username || !email || !password || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the email already exists in the database
  User.findByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error checking email", error: err });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create the user if email is not taken
    User.create({ username, email, password: hashedPassword, category }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error registering user", error: err });
      }
      console.log("User created successfully:", result);
      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId,
      });
    });
  });
});

// User Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  User.findByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error checking email", error: err });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    const user = result[0]; // Get the first user

    // Compare the password with the hashed password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a token (JWT) for the user
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        category: user.category // Include the category in the token
      }, 
      "your_secret_key", 
      { expiresIn: "1h" } // Set expiration time for the token
    );

    res.status(200).json({
      message: "Login successful",
      token: token, // Send the token back to the client
    });
  });
});

module.exports = router;
