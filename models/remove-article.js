const knex = require("../db/connection");
const removeArticle = article_id => {
  return knex("articles")
    .where({ article_id })
    .del();
};

module.exports = removeArticle;
