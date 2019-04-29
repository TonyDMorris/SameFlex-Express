const passHash = require("../utils/bcrypt");

const insertUser = require("./insert-user");
const knex = require("../db/connection");
const validateUserEnrol = body => {
  const [user] = body;

  return Promise.all([
    knex("users")
      .select("*")
      .where("username", user.username),
    user
  ])
    .then(([[user], reqUser]) => {
      if (user) {
        return Promise.reject({ msg: "user already exists", status: 403 });
      } else {
        const { username, avatar_url, name } = reqUser;
        const dbUser = { username, avatar_url, name };
        const { password } = reqUser;
        return Promise.all([passHash(password), dbUser]);
      }
    })
    .then(([hash, user]) => {
      return insertUser({ password: hash, ...user });
    })
    .then(({ user }) => {
      console.log(user);
      return { user: user.username };
    });
};

module.exports = validateUserEnrol;
