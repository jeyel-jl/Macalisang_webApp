const db = require("../config/db");

class Product {
  static create({ name, detail, category, price, company, image }, callback) {
    db.query(
      "INSERT INTO products (name, detail, category, price, company, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, detail, category, price, company, image],
      callback
    );
  }

  static getAll(callback) {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return callback(err, null);
      }
      console.log("Products fetched:", results);
      return callback(null, results);
    });
  }
  
  static getById(id, callback) {
    db.query("SELECT * FROM products WHERE id = ?", [id], callback);
  }
}

module.exports = Product;
