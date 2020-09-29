const path = require("path");
const sqlite3 = require("sqlite3");

//config
const config = require("../../config");

class DB {
  constructor(table) {
    this.db = new sqlite3.Database(
      path.join(config.DB_PATH, `${config.DB_NAME}.sqlite`)
    );
    this.table_name = table;
    this.limit = 10;
    this.create_table();
  }

  create_table() {}
  /////////////////////////
  // new methods
  /////////////////////////
  find({ limit = this.limit, fields = [], sort = false } = {}) {
    return new Promise((succ, rej) => {
      let sql = `SELECT ${fields.length > 0 ? fields.join(",") : "*"} FROM ${
        this.table_name
      } ORDER BY create_date ${sort ? "ASC" : "DESC"} LIMIT ${limit}`;
      this.db.all(sql, (err, rows) => {
        if (err) return rej(err);
        succ(rows);
      });
    });
  }
  find_all({ fields = [], query = [], sort = false } = {}) {
    return new Promise((succ, rej) => {
      if (query.length == 0) return reject("query is empty!");
      if (typeof query == "string") return reject("query is array required!");
      // set query
      query = `${query[0]}='${query[1]}'`;

      let sql = `SELECT ${fields.length > 0 ? fields.join(",") : "*"} FROM ${
        this.table_name
      } WHERE ${query} ORDER BY create_date ${sort ? "ASC" : "DESC"}`;
      this.db.all(sql, (err, rows) => {
        if (err) return rej(err);
        succ(rows);
      });
    });
  }

  find_by_page({
    limit = this.limit,
    fields = [],
    current_page_number = 1,
    sort = false
  } = {}) {
    return new Promise((resolve, reject) => {
      let start = current_page_number * limit - limit;

      let sql = `SELECT ${fields.length > 0 ? fields.join(",") : "*"} FROM ${
        this.table_name
      } ORDER BY create_date ${sort ? "ASC" : "DESC"} LIMIT ${start},${limit}`;

      this.db.all(sql, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
  find_by_pages_total() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total FROM ${this.table_name}`;
      this.db.all(sql, (err, data) => {
        if (err) return reject(err);
        let total = Math.ceil(data[0]["total"] / this.limit);
        resolve(total);
      });
    });
  }

  find_one({ fields = [], query = [] } = {}) {
    return new Promise((resolve, reject) => {
      if (query.length == 0) return reject("query is empty!");
      if (typeof query == "string") return reject("query is array required!");

      query = `${query[0]}='${query[1]}'`;
      if (query == null) return reject("query not found!");
      let sql = `SELECT ${fields.length > 0 ? fields.join(",") : "*"} FROM ${
        this.table_name
      } WHERE ${query}`;
      this.db.get(sql, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  update_by_id(id = null, object = {}) {
    let query = [];
    return new Promise((resolve, reject) => {
      if (id == null) return reject("ID is not found!");
      for (let key in object) {
        query.push(`${key}='${object[key]}'`);
      }
      let sql = `UPDATE ${this.table_name} SET ${query.join(",")} WHERE id=?`;

      this.db.run(sql, id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  delete_by_id(id = null) {
    return new Promise((resolve, reject) => {
      if (id == null) return reject("id not found!");

      let sql = `DELETE FROM ${this.table_name} WHERE id=?`;
      this.db.all(sql, id, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = DB;
