const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

/**
 * Initializes passport object
 * @param {*} passport
 */
const initialize = (passport) => {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (user === null || user === undefined) {
        return done(null, false, { message: "Username does not exist." });
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((_user, done) => {
    return done(null, _user._id);
  });

  passport.deserializeUser(async (id, done) => {
    return done(null, await userModel.findOne({ _id: id }));
  });
};

module.exports = initialize;
