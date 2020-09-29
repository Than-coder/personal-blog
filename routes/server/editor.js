const Router = require("express").Router();

// controller
const editor_controller = require("../../controllers/server/Editor");
const image_controller = require("../../controllers/server/Image");

// update
// editor
Router.put("/server-api-post-update/", editor_controller.post_update_api);
Router.put(
  "/server-api-post-update-detail-page/",
  editor_controller.post_update_detail_api
);

// editor file upload
Router.get("/server-api-editor-image", image_controller.editor_get_image_api);

Router.post(
  "/server-api-editor-fileupload",
  image_controller.editor_file_upload_api
);
// image browser image
Router.get(
  "/server-editor-image-browser",
  image_controller.editor_get_image_browser
);

// image upload
Router.post("/image-upload", image_controller.add_image_post);

module.exports = Router;
