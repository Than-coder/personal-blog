const path = require('path')



module.exports = {
  PORT: 3333,
  DB_NAME: "blog",
  DB_PATH: path.dirname(__filename),
  // can use api
  USED_DB: 'sqlite'
};
