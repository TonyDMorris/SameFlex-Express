const knex = require("../db/connection");

const insertUser = user => {
  return knex("users")
    .insert(user)
    .returning("*")
    .then(([user]) => {
      return { user };
    });
};

module.exports = insertUser;
