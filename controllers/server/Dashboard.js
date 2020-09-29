// controller
const post_model = require("../../models/DB_Controller").post_model;
const category_model = require("../../models/DB_Controller").category_model;
// common
const common = require("./common");

// dashboard home page
async function index(req, res) {
  try {
    res.render("dashboard/index");
  } catch (error) {
    res.status(500).json({ error });
  }
}

// post table
async function post_table(req, res) {
  let [posts, pages, current_page, page_number, query] = [
    [],
    [],
    1,
    1,
    req.query
  ];
  // set page
  if (query.page) {
    current_page = query.page;
  }
  try {
    posts = await post_model.find_by_page({
      current_page_number: current_page,
      fields: ["id", "title", "create_date", "category_name"]
    });
    page_number = await post_model.find_by_pages_total();
    pages = common.page_number_to_array(page_number, current_page);

    res.render("dashboard/post_table", {
      posts,
      pages,
      current_page,
      current_page_name: "post_page"
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// edit
async function post_edit(req, res) {
  let [post, post_id, categories] = [null, null, []];
  let query = req.query;
  if (query.post_id) {
    post_id = query.post_id;
  }
  try {
    if (post_id == null) throw "post id is null";

    post = await post_model.find_one({ query: ["id", post_id] });
    categories = await category_model.find({ limit: 100 });

    res.render("dashboard/post_edit", {
      post,
      categories
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// new post
async function new_post(req, res) {
  let [categories] = [[]];
  try {
    categories = await category_model.find({ limit: 100 });
    res.render("dashboard/new_post", { categories });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// api
async function new_post_api(req, res) {
  try {
    const { title, author, body, category_name } = req.body;
    if (title == "") throw "Title Field is Empty!";

    await post_model.add({ title, author, body, category_name });
    // update category count
    category_count = await post_model.find_by_category_name_total({
      category_name
    });
    await category_model.update_by_name({
      name: category_name,
      post_counts: category_count
    });

    res.json({ message: "Post Added" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// post delete
async function post_delete_id_api(req, res) {
  let post_id = req.query.post_id;
  try {
    if (post_id == null) throw "Post ID Not Found!";
    // get category name
    let post = await post_model.find_one({ id: post_id });
    let category_name = post.category_name;
    // delete post
    await post_model.delete_by_id(post_id);
    // update category count
    category_count = await post_model.find_by_category_name_total({
      category_name
    });
    await category_model.update_by_name({
      name: category_name,
      post_counts: category_count
    });

    res.json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
////////////////////////////////////////
// category
////////////////////////////////////////

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

// update api
async function category_name_update_api(req, res) {
  let query = req.query;
  try {
    if (query.id == null) throw "id query not found";
    if (query.name == null) throw "name query not found";

    // update
    await category_model.update_by_id({
      id: query.id,
      name: query.name
    });

    res.status(200).json({ message: "Category Name Updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// new api
async function category_name_new_api(req, res) {
  let post_counts = 0;
  let query = req.query;
  try {
    if (query.name == null) throw "name query not found";

    // new
    await category_model.add({ name: query.name, post_counts });

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
  index,
  post_table,
  post_edit,
  new_post,
  new_post_api,
  post_delete_id_api,
  ///////////////
  //category
  category_table,
  category_name_update_api,
  // new
  category_name_new_api,
  category_delete_id_api
};
