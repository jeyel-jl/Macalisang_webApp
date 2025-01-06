const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Import database connection
const verifyToken = require("../config/authMiddleware"); // Middleware to validate token

// Route to get current user details
router.get("/get-curr-user", verifyToken, (req, res) => {
  const userId = req.userId; // Extract userId set by the verifyToken middleware

  const query = "SELECT id, username, email FROM users WHERE id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]); // Return the user information
  });
});

module.exports = router;
