// controller
const { category_model } = require("../../../models/DB_Controller");
// common
const common = require("../common");

// category table
async function category_table(req, res) {
  let [categories, pages, current_page, page_number] = [[], [], 1, 1];
  let query = req.query;
  if (query.page) {
    current_page = query.page;
  }
  try {
    categories = await category_model.find_by_page({
      current_page_number: page_number
    });
    page_number = await category_model.find_by_pages_total();
    pages = common.page_number_to_array(page_number, current_page);

    res.render("dashboard/category_table", {
      categories,
      pages,
      current_page,
      current_page_name: "category_page"
    });
  } catch (err) {
    res.status(500).json({ error });
  }
}

//////////////////////////
// new api
//////////////////////////

// update api
async function category_update_api(req, res) {
  let [id, query] = [null, req.query];
  if (query.id) {
    id = query.id;
  }
  try {
    if (id == null) throw "id query not found";
    // update
    await category_model.update_by_id(id, req.body);

    res.status(200).json({ message: "Category Name Updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// new
async function category_new_api(req, res) {
  let [name, post_counts] = [null, 0];
  if (req.body.name) {
    name = req.body.name;
  }
  if (req.body.post_counts) {
    post_counts = req.body.post_counts;
  }
  try {
    if (name == null) throw "category name not found!";
    // new
    await category_model.add({ name, post_counts });

    res.status(200).json({ message: "Category Name Added" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// category delete
async function category_delete_id_api(req, res) {
  let id = req.query.category_id;
  try {
    if (id == null) throw "ID Not Found!";
    // delete
    await category_model.delete_by_id(id);

    res.json({ message: "Category Deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  category_table,
  category_update_api,
  // new
  category_new_api,
  category_delete_id_api
};
