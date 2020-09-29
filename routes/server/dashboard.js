const Router = require("express").Router();

const dashboard_controller = require("../../controllers/server/Dashboard");

// dashboard
Router.get("/", dashboard_controller.index);

Router.get("/post-table", dashboard_controller.post_table);

Router.get("/post/edit", dashboard_controller.post_edit);

// new post
Router.get("/new-post", dashboard_controller.new_post);
// new post
Router.post("/server-api-post-new", dashboard_controller.new_post_api);

// post delete
Router.delete("/post/delete", dashboard_controller.post_delete_id_api);

//////////////////////////////////
// category
//////////////////////////////////
// table
Router.get("/category-table", dashboard_controller.category_table);

// update
Router.put(
  "/server-api-category-name-update/",
  dashboard_controller.category_name_update_api
);
// new
Router.put(
  "/server-api-category-name-new/",
  dashboard_controller.category_name_new_api
);
// delete
Router.delete(
  "/server-api-category-delete/",
  dashboard_controller.category_delete_id_api
);

module.exports = Router;
