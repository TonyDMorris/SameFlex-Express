const { knex } = require("../connection");
const { topics, users, articles, comments } = require("../data/index");
exports.seed = (knex, Promise) => {
  console.log(topics);
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(topics)
        .into("topics")
        .returning("*");
    })
    .then(data => {
      console.log(data);
    });
};
