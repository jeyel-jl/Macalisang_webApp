const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const getCurrUserRoutes = require("./models/CurrUser");
const cartRoutes = require("./routes/cart");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/curr", getCurrUserRoutes);
app.use("/api/cart", cartRoutes);


// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});