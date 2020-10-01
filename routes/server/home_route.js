const Router = require("express").Router();

// controllers
const post_controller = require("../../controllers/server/Post");

///////////////////
// Post

// home
Router.get("/", post_controller.home_page);
// detail
Router.get("/post", post_controller.detail_page);
// category page
Router.get("/post/category/", post_controller.search_category_page);

module.exports = Router;
