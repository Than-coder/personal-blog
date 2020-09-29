// passport
const passport = require("passport");
// model
const user_model = require("../../../models/DB_Controller").user_model;

// common
const common = require("../common");

///////////////////////////////
// user
///////////////////////////////

// user form
async function user_login(req, res) {
  try {
    res.render("user/login");
  } catch (error) {
    res.status(500).json({ error });
  }
}

// user form submit
async function user_login_submit(req, res, next) {
  try {
    const { username, password } = req.body;
    // //   not found fields
    if (username == null) throw "username field is not found!";
    if (password == null) throw "username field is not found!";
    // check username is empty
    if (username == "")
      return res.render("user/login", {
        error_message: "username is required"
      });
    // check user length
    let users = await user_model.find();
    if (users.length == 0) return res.redirect("/user/admin/register");
    // pass
    passport.authenticate("local", (err, user, info) => {
      if (!user) {
        return res.render("user/login", {
          error_message: info.message,
          username
        });
      }
      // userpassed
      // res.locals.currentUser = user;
      // console.log(res.locals);
      req.login(user, err => {
        if (err) return next(err);
        res.locals.currentUser = req.user;
        res.redirect("/");
      });
    })(req, res, next);

    // res.send("pass");
  } catch (error) {
    res.status(500).json({ error });
  }
}

///////////////////////////////
// admin user
///////////////////////////////
// admin register form
async function user_admin(req, res) {
  try {
    res.render("user/admin_register");
  } catch (error) {
    res.status(500).json({ error });
  }
}

// admin register form submit
async function user_admin_form(req, res) {
  const { username, password, confirm } = req.body;
  try {
    //   check all fiedls
    if (username == "" || password == "" || confirm == "") {
      return res.render("user/admin_register", {
        error_message: "please fill all fiedls!",
        username,
        password
      });
    }
    // check password
    if (password != confirm) {
      return res.render("user/admin_register", {
        error_message: "confirm password not match!",
        username,
        password
      });
    }
    // admin user register
    // check admin user
    let user = await user_model.find_one_admin({ username });
    // user is already
    if (user != undefined) {
      return res.render("user/admin_register", {
        error_message: "Admin User Registered | Admin User Should One Account!",
        username,
        password
      });
    }
    // create user object
    const admin_user = {
      username,
      is_admin: true,
      password: common.password_hash(password)
    };
    // add user
    await user_model.add(admin_user);
    // redirect to login
    res.redirect("/user/login");
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  user_login,
  user_login_submit,
  //   admin
  user_admin,
  user_admin_form
};
