const DB = require("./DB_Class");

class Post extends DB {
  create_table() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.table_name} (
      id INTEGER PRIMARY KEY,
      title TEXT,
      author TEXT,
      body TEXT,
      category_name TEXT ,
      create_date DATETIME)`;
    return new Promise((resolve, reject) => {
      this.db.run(sql, err => {
        if (err) return reject(err);
        resolve("create table");
      });
    });
  }

  ///////////////////////////////
  // new methods
  ///////////////////////////////
  find_by_category_page({
    category_name = null,
    current_page_number = 1,
    fields = [],
    sort = false,
    limit = this.limit
  } = {}) {
    return new Promise((resolve, reject) => {
      if (category_name == null) return reject("category name is not found!");
      let start = current_page_number * limit - limit;

      let sql = `SELECT ${fields.length > 0 ? fields.join(",") : "*"} FROM ${
        this.table_name
      } WHERE category_name='${category_name}' ORDER BY create_date ${
        sort ? "ASC" : "DESC"
      } LIMIT ${start},${limit}`;

      this.db.all(sql, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  find_by_category_page_total({ category_name = null } = {}) {
    return new Promise((resolve, reject) => {
      if (category_name == null) return reject("category name not found!");

      let sql = `SELECT COUNT(*) AS count FROM ${this.table_name} WHERE category_name=? `;

      this.db.all(sql, category_name, (err, result) => {
        if (err) return reject(err);
        let counts = Math.ceil(result[0].count / this.limit);
        resolve(counts);
      });
    });
  }

  find_by_category_name_total({ category_name = null } = {}) {
    return new Promise((resolve, reject) => {
      if (category_name == null) return reject("category name not found!");

      let sql = `SELECT COUNT(*) AS count FROM ${this.table_name} WHERE category_name=? `;

      this.db.all(sql, category_name, (err, result) => {
        if (err) return reject(err);
        resolve(result[0].count);
      });
    });
  }

  add({
    title = null,
    author = "unknown",
    category_name = "unknown",
    create_date = new Date()
  } = {}) {
    return new Promise((resolve, reject) => {
      if (title == null) return reject("title fields is empty!");

      let sql = `INSERT INTO ${this.table_name} (title,author,category_name,create_date) VALUES (?,?,?,?)`;
      this.db.run(
        sql,
        title,
        author,
        category_name,
        create_date,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
}

const post = new Post("post");

module.exports = post;
