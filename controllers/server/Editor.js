// controller
const post_model = require("../../models/DB_Controller").post_model;
const category_model = require("../../models/DB_Controller").category_model;

// update api edit
async function post_update_api(req, res) {
  try {
    let id = req.query.post_id;
    const { title, body, category_name } = req.body;
    // update
    await post_model.update_by_id(id, { title, body, category_name });
    // update category count
    category_count = await post_model.find_by_category_name_total({
      category_name
    });

    await category_model.update_by_name({
      name: category_name,
      post_counts: category_count
    });

    res.json({ message: "Post Updated" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

// update api detail
async function post_update_detail_api(req, res) {
  try {
    let id = req.query.post_id;
    const { body } = req.body;
    await post_model.update_by_id(id, { body });

    res.json({ message: "Post Updated" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = {
  post_update_api,
  post_update_detail_api
};
