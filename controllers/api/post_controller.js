// models
const { post_model } = require("../../models/DB_Controller");

async function get_post(req, res) {
  let [posts, page, limit, fields, is_public, query] = [
    [],
    1,
    undefined,
    [],
    1,
    req.query
  ];
  if (query.page) {
    page = query.page;
  }
  if (query.limit) {
    limit = query.limit;
  }
  if (query.is_public) {
    is_public = query.is_public;
  }
  if (query.fields) {
    fields = query.fields.split(",");
  }

  try {
    posts = await post_model.find_by_page({
      limit,
      fields,
      current_page_number: page,
      query: ["is_public", is_public]
    });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function get_post_one(req, res) {
  let [id, post, fields, query] = [null, {}, [], req.query];

  if (query.fields) {
    fields = query.fields.split(",");
  }
  if (query.id) {
    id = query.id;
  }

  try {
    if (id == null) throw "ID Fields is not found!";
    post = await post_model.find_one({ fields, id });

    res.json({ post });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  get_post,
  get_post_one
};
