const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const authService = {
  getUserwithUsername(db, user_name) {
    return db("users").where({ user_name }).first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  verifyJWT(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithm: "HS256",
    });
  },

  createJWT(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },
};

module.exports = authService;
