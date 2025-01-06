const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", (req, res) => {
  console.log("Received data:", req.body);
  const { username, email, password, category, address, phone_number } = req.body;

  if (!username || !email || !password || !category || !address || !phone_number) {
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

    User.create({ username, email, password: hashedPassword, category, address, phone: phone_number }, (err, result) => {
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
        category: user.category,
        address: user.address,
        phone: user.phone
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

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password, category, address, phone } = req.body;

  if (!username || !email || !category || !address || !phone) {
    return res.status(400).json({ message: "All fields except password are required" });
  }

  try {
    const updateData = { username, email, category, address, phone };
    if (password) {
      updateData.password = bcrypt.hashSync(password, 8);
    }

    const result = await User.update(id, updateData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

module.exports = router;
