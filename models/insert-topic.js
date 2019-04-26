const knex = require("../db/connection");
const insertTopic = topic => {
  return knex("topics")
    .insert(topic)
    .returning("*")
    .then(([topic]) => {
      return { topic };
    });
};

module.exports = insertTopic;
