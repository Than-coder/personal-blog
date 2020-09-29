const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// model
const user_model = require("../../models/DB_Controller").user_model;

function localStrategy(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        let user = await user_model.find_one({ query: ["username", username] });
        //   check user
        if (!user) return done(null, false, { message: "Username not found!" });
        //   check password
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false, { message: "User password not match!" });

        // user is match
        done(null, user);
      } catch (error) {
        console.log(`LocalStrategy error: ${error}`);
      }
    })
  );
}

function serializeUser(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await user_model.find_one({ query: ["id", id] });
      done(null, user);
    } catch (error) {
      console.log(`deserialize error: ${error}`);
    }
  });
}

module.exports = {
  localStrategy,
  serializeUser
};
