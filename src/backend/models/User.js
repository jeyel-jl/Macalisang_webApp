const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static create({ username, email, password, category }, callback) {
    db.query(
      "INSERT INTO users (username, email, password, category) VALUES (?, ?, ?, ?)",
      [username, email, password, category],
      callback
    );
  }

  static findByEmail(email, callback) {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  }

  static findById(id, callback) {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  }
}

module.exports = User;
