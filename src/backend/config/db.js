const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "Admin123", // Your MySQL password
  database: "ecommerce", // Your database name
  port: 4000,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

module.exports = db;
