const knex = require("../db/connection");
const insertArticle = article => {
  console.log(article);
  return knex("articles")
    .insert(article)
    .returning(insertedArticle => {
      return insertedArticle;
    });
};

module.exports = insertArticle;
