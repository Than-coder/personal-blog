// model
const post_model = require("../../models/DB_Controller").post_model;
const category_modal = require("../../models/DB_Controller").category_model;
// common
const common = require("./common");

// index
// GET
async function home_page(req, res) {
  let [posts, categories, pages, current_page, page_number] = [
    [],
    [],
    [1, 2, 3, 4, 5],
    1,
    1
  ];
  let query = req.query;
  if (query.page) {
    current_page = query.page;
  }
  try {
    posts = await post_model.find_by_page({
      current_page_number: current_page,
      query: ["is_public", 1]
    });
    categories = await category_modal.find({
      limit: 200,
      fields: ["id", "name", "post_counts"]
    });
    page_number = await post_model.find_by_pages_total();
    pages = common.page_number_to_array(page_number, current_page);

    res.render("index", {
      posts,
      categories,
      pages,
      current_page,
      pagination_name: "home",
      is_found_post_image: common.is_found_post_image,
      remove_tag: common.remove_tag,
      parse_date: common.parse_date
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// detail
async function detail_page(req, res) {
  let [post, id] = [null, req.query.post_id];
  try {
    // check query
    if (id == null) throw "post id not found!";
    // categories
    categories = await category_modal.find({
      limit: 100,
      fields: ["id", "name", "post_counts"]
    });
    // post
    post = await post_model.find_one({ query: ["id", id] });

    res.render("detail", {
      post,
      categories,
      parse_date: common.parse_date
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// home page
async function search_category_page(req, res) {
  let [posts, categories, category_name, pages, current_page] = [
    [],
    [],
    null,
    [],
    1
  ];
  const query = req.query;
  // set page
  if (query.page) {
    current_page = query.page;
  }

  try {
    if (query.category_name == null) throw "category_name not found";
    // set

    category_name = query.category_name;

    // posts
    posts = await post_model.find_by_category_page({
      category_name,
      current_page_number: current_page,
      query: ["is_public", 1]
    });
    // categories
    categories = await category_modal.find({
      limit: 100,
      fields: ["id", "name", "post_counts"]
    });
    // pages
    page_number = await post_model.find_by_category_page_total({
      category_name
    });
    pages = common.page_number_to_array(page_number, current_page);
  } catch (error) {
    res.status(500).json({ error });
  }

  res.render("index", {
    posts,
    categories,
    pages,
    current_page,
    pagination_name: "search_category",
    current_category_name: category_name,
    is_found_post_image: common.is_found_post_image,
    remove_tag: common.remove_tag,
    parse_date: common.parse_date
  });
}

module.exports = {
  home_page,
  detail_page,
  search_category_page
};
