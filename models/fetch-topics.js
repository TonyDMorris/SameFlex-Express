const knex = require("../db/connection");
const fetchTopics = () => {
  return knex("topics")
    .select("*")
    .then(topics => {
      return { topics };
    });
};

module.exports = fetchTopics;
