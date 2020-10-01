// controller
const { post_model, category_model } = require("../../../models/DB_Controller");
// common
const common = require("../common");

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
      fields: [
        "id",
        "title",
        "author",
        "is_public",
        "create_date",
        "category_name"
      ]
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
/////////////////////////////
// api
/////////////////////////////
// new post api
async function post_new_api(req, res) {
  let [title, author, body, category_name, is_public, create_date] = [
    "untitled",
    "unknown",
    "",
    "unknown",
    0,
    new Date().getTime()
  ];
  // title
  if (req.body.title) {
    title = req.body.title;
  }
  // author
  if (req.body.author) {
    author = req.body.author;
  }
  // body
  if (req.body.body) {
    body = req.body.body;
  }
  // category_name
  if (req.body.category_name) {
    category_name = req.body.category_name;
  }
  // is_public
  if (req.body.is_public) {
    is_public = req.body.is_public;
  }

  try {
    await post_model.add({
      title,
      category_name,
      author,
      body,
      is_public,
      create_date
    });
    // update category count
    category_count = await post_model.find_by_category_name_total({
      category_name
    });
    await category_model.update_by_name({
      name: category_name,
      post_counts: category_count
    });
    // find by post date
    let post = await post_model.find_one({
      query: ["create_date", create_date]
    });

    res.json({ post_id: post.id, message: "Post Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

// post delete
async function post_delete_id_api(req, res) {
  let post_id = req.query.post_id;
  try {
    if (post_id == null) throw "Post ID Not Found!";
    // get category name
    let post = await post_model.find_one({ query: ["id", post_id] });
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

// update
async function post_update_api(req, res) {
  let [post_id, category_name, query] = [null, "unknown", req.query];
  if (query.post_id) {
    post_id = query.post_id;
  }
  if (req.body.category_name) {
    category_name = req.body.category_name;
  }
  try {
    if (post_id == null) throw "post_id query is empty!";

    // update
    await post_model.update_by_id(post_id, req.body);
    // update category count
    category_count = await post_model.find_by_category_name_total({
      category_name
    });
    // update category name
    await category_model.update_by_name({
      name: category_name,
      post_counts: category_count
    });
    // send client
    res.status(200).json({ message: "Post Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

module.exports = {
  post_table,
  post_edit,
  new_post,
  // api
  post_new_api,
  post_delete_id_api,
  post_update_api
};
