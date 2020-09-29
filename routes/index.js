const Router = require("express").Router();

// Dashboard
Router.use("/", require("./server/home"));
Router.use("/dashboard", require("./server/dashboard"));
Router.use("/editor", require("./server/editor"));

// user
Router.use("/user", require("./server/user/index"));

///////////////////////////
// application program interface & API
///////////////////////////
Router.use("/api", require("./api"));

module.exports = Router;
