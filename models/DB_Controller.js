// config
const config = require("../config");

// model
const post_model = require("./sqlite/Post");
const user_model = require("./sqlite/User");
const category_model = require("./sqlite/Category");

var models = { post_model, user_model, category_model };

// db
if (
  config.USED_DB == "sqlite" ||
  config.USED_DB == "" ||
  config.USED_DB == null
) {
  // sqlite
  models = {
    post_model,
    user_model,
    category_model
  };
}

module.exports = models;
