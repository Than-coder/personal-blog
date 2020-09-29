const Router = require("express").Router();

// user controller
const user_controller = require("../../../controllers/server/user/user_controller");

// user
Router.get("/login", user_controller.user_login);
// form submit
Router.post("/login", user_controller.user_login_submit);
Router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/user/login");
});

// admin form
Router.get("/admin/register", user_controller.user_admin);
Router.post("/admin/register", user_controller.user_admin_form);

module.exports = Router;
