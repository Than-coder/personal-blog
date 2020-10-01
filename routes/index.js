const Router = require("express").Router();

// Dashboard
Router.use("/", require("./server/home_route"));
Router.use("/dashboard", require("./server/dashboard_route"));
Router.use("/editor", require("./server/editor_route"));

// user
Router.use("/user", require("./server/user/user_route"));

///////////////////////////
// application program interface & API
///////////////////////////
Router.use("/api", require("./api"));

module.exports = Router;
