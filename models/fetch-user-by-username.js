const knex = require("../db/connection");
const fetchUserByUsername = username => {
  return knex("users")
    .where({ username })
    .returning("*")
    .then(([user]) => {
      return { user };
    });
};

module.exports = fetchUserByUsername;
