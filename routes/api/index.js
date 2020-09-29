const Router = require("express").Router();

// controller
const post_controller = require("../../controllers/api/post_controller");

// post
Router.get("/post", post_controller.get_post);
// one
Router.get("/post_one", post_controller.get_post_one);

module.exports = Router;
