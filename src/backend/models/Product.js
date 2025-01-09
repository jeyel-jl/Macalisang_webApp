  const db = require("../config/db");

  class Product {
    static create({ name, detail, category, price, company, image }, callback) {
      db.query(
        "INSERT INTO products (name, detail, category, price, company, image) VALUES (?, ?, ?, ?, ?, ?)",
        [name, detail, category, price, company, image],
        (err, result) => {
          if (err) {
            console.error("Error during query:", err);
            return callback(err, null);
          }
    
          console.log("Product successfully added:", result);
          return callback(null, result);
        }
      );
    }

    static getAll(callback) {
      db.query("SELECT * FROM products", (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return callback(err, null);
        }
        return callback(null, results);
      });
    }

    static delete(id, callback) {
      db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
          console.error("Database delete error:", err);
          return callback(err, null);
        }
        console.log("Product deleted:", result);
        return callback(null, result);
      });
    }
    
    
    static getById(id, callback) {
      db.query("SELECT * FROM products WHERE id = ?", [id], callback);
    }
  }

  module.exports = Product;
