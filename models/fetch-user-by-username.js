const knex = require("../db/connection");
const fetchUserByUsername = username => {
  return knex("users")
    .where({ username })
    .returning("*");
};

module.exports = fetchUserByUsername;
