const knex = require("../db/connection");
const insertArticle = article => {
  return knex("articles")
    .insert(article)
    .returning("*")
    .then(([article]) => {
      return { article };
    });
};

module.exports = insertArticle;
