const db = require("../config/db");

class User {
  static create({ username, email, password, category, address, phone }, callback) {
    db.query(
      "INSERT INTO users (username, email, password, category, address, phone_number) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, password, category, address, phone],
      callback
    );
  }

  static findByEmail(email, callback) {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  }

  static findById(id, callback) {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  }

  static update(id, updateData) {
    const fields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);
    values.push(id);

    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ${fields} WHERE id = ?`, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  
}

module.exports = User;
