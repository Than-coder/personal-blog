const DB = require("./DB_Class");

class Category extends DB {
  create_table() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.table_name} 
    (
      id INTEGER PRIMARY KEY,
      name TEXT,
      post_counts INTEGER ,
      create_date DATETIME
    )`;
    return new Promise((succ, rej) => {
      this.db.run(sql, err => {
        if (err) return rej(err);
        succ(`created table ${this.table_name}`);
      });
    });
  }

  ////////////////////////////////////
  // new methods
  ////////////////////////////////////
  update_by_name({ name = null, post_counts = 0 } = {}) {
    return new Promise((resolve, reject) => {
      if (name == null) return reject("category name not found!");

      let sql = `UPDATE ${this.table_name} SET post_counts=? WHERE name=?`;
      this.db.run(sql, post_counts, name, err => {
        if (err) return reject(err);
        resolve("updated");
      });
    });
  }

  update_by_id({ id = null, name = "" } = {}) {
    return new Promise((resolve, reject) => {
      if (id == null) return reject("is not found!");

      let sql = `UPDATE ${this.table_name} SET name=? WHERE id=?`;
      this.db.run(sql, name, id, err => {
        if (err) return reject(err);
        resolve("updated");
      });
    });
  }

  add({ name = null, post_counts = 0, create_date = new Date() } = {}) {
    return new Promise((resolve, reject) => {
      if (name == null) return reject("category_name is empty!");

      let sql = `INSERT INTO ${this.table_name} (name,post_counts,create_date) VALUES (?,?,?)`;
      this.db.run(sql, name, post_counts, create_date, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
}

const category = new Category("category");

module.exports = category;
