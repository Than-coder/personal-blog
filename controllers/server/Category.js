// model
const category_model = require("../../models/DB_Controller").category_model;

async function add_category_template(req, res) {
  const categorys = await category_model.get_all(100);

  res.render("add_category", { categorys });
}

async function add_category(req, res) {
  try {
    const name = req.body.name;
    if (!name) throw "name is required";
    // category name exists
    const isMatch = await category_model.get_by_name(name);
    if (isMatch) throw "category name already";
    // not exists
    await category_model.add({ name });
    // success
    const categorys = await category_model.get_all(100);
    res.render("add_category", { categorys, success: `${name} added` });
  } catch (err) {
    const categorys = await category_model.get_all(100);

    res.render("add_category", { categorys, err });
  }
}

module.exports = {
  add_category_template,
  add_category
};
