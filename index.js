#!/usr/bin/env node

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const open = require("open");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");

// config
const config = require("./config");

const app = express();

// security
app.use(cors());
// express layout
app.use(expressLayouts);

// template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// user localStrategy
require("./controllers/server/passport").localStrategy(passport);
// serialize user
require("./controllers/server/passport").serializeUser(passport);

// public folder
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(
  session({
    secret: "my scret",
    resave: true,
    saveUninitialized: true
  })
);

//moddleware
app.use(bodyParser.json({ parameterLimit: 1000000, limit: "1mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "5mb",
    parameterLimit: 1000000
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// local
app.use((req, res, next) => {
  res.locals.user = req.user;

  next();
});

// routes
app.use("/", require("./routes"));

app.get("*", (req, res) => res.send("Not Found Page!"));

// server
app.listen(config.PORT, () => console.log(`Server on port ${config.PORT}`));

// for production
// open browser
if (app.get("env") == "production") {
  open(`http://localhost:${config.PORT}`);
}
