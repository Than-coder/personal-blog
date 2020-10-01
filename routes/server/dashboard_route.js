const Router = require("express").Router();

const dashboard_controller = require("../../controllers/server/dashboard/dashboard_controller");
const post_controller = require("../../controllers/server/dashboard/post_controller");
const category_controller = require("../../controllers/server/dashboard/category_controller");

// dashboard
Router.get("/", dashboard_controller.dashboard_page);

//////////////////////////////
// post
//////////////////////////////
Router.get("/post-table", post_controller.post_table);

Router.get("/post-table-edit", post_controller.post_edit);

// new post
Router.get("/post-new", post_controller.new_post);
////////////////////
// api
////////////////////
// post delete
Router.delete("/post-delete-api", post_controller.post_delete_id_api);
// new post
Router.post("/post-new-api", post_controller.post_new_api);
// update
Router.put("/post-update-api", post_controller.post_update_api);

//////////////////////////////////
// category
//////////////////////////////////
// table
Router.get("/category-table", category_controller.category_table);

// update
Router.put("/category-update-api/", category_controller.category_update_api);
// new
Router.post("/category-new-api/", category_controller.category_new_api);
// delete
Router.delete(
  "/category-delete-api/",
  category_controller.category_delete_id_api
);

module.exports = Router;
