const knex = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginVerify = ({ username, password }) => {
  return knex("users")
    .select("*")
    .where({ username })
    .then(([user]) => {
      if (!user) {
        const err = { msg: "no such user", status: "404" };
        return Promise.reject(err);
      } else {
        return Promise.all([bcrypt.compare(password, user.password), user]);
      }
    })
    .then(([validation, user]) => {
      if (!validation) {
        const err = { msg: "passwords do not match", status: "400" };
        return Promise.reject(err);
      } else {
        return jwt.sign({ user: user.username, iat: Date.now() }, "secret");
      }
    });
};

module.exports = loginVerify;
