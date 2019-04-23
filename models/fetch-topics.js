const knex = require("../db/connection");
const fetchTopics = () => {
  console.log("made it tot he model");
  return knex("topics")
    .select("*")
    .then(topics => {
      return { topics };
    });
};

module.exports = fetchTopics;
