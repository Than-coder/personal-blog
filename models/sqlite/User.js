const DB = require("./DB_Class");

class User extends DB {
  create_table() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.table_name} (
            id INTEGER PRIMARY KEY,
            username TEXT,
            is_admin INTEGER,
            password TEXT,
            create_date DATETIME
        )`;

    this.db.run(sql, err => {
      if (err) return console.log(err);
    });
  }

  // add
  add({
    username = null,
    password = null,
    is_admin = false,
    create_date = new Date()
  } = {}) {
    return new Promise(async (resolve, reject) => {
      if (username == null) return reject("username fields not found!");
      if (password == null) return reject("password fields not found!");
      // search username
      let user = await this.find_one({ username });
      if (user != undefined) return reject("username is already exists");

      let sql = `INSERT INTO ${this.table_name} (username,password,is_admin,create_date) VALUES (?,?,?,?)`;
      this.db.run(
        sql,
        username,
        password,
        is_admin,
        create_date,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  // admin user
  find_one_admin(object = {}) {
    let [query, fields] = [null, []];
    for (let key in object) {
      if (key == "fields") {
        fields = object[key];
        continue;
      }
      query = `${key}='${object[key]}'`;
    }

    return new Promise((resolve, reject) => {
      // check query
      if (query == null) return reject("query is empty");

      let sql = `SELECT ${fields.length > 0 ? fields : "*"} FROM ${
        this.table_name
      } WHERE ${query} AND is_admin=1`;
      this.db.get(sql, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new User("user");
