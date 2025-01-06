const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password, category } = req.body;

  if (!username || !email || !password || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error checking email", error: err });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

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

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error checking email", error: err });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    const user = result[0];

    console.log("User data from database:", user);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        category: user.category
      }, 
      "your_secret_key", 
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user,
    });
  });
});

module.exports = router;
