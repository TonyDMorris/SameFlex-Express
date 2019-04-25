const knex = require("../db/connection");
const insertArticle = article => {
  return knex("articles")
    .insert(article)
    .returning("*")
    .then(insertedArticle => {
      return { insertedArticle };
    });
};

module.exports = insertArticle;
