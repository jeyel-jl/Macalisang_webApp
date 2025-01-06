const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-auth-token"]; // Look for the token in the headers

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verify the token using the secret key
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.userId; // Attach userId from token to the request
    next();
  })
};

module.exports = verifyToken;
