const knex = require("../db/connection");
const insertArticle = article => {
  console.log(article);
  const updatedArticle = {
    body: article.body,
    author: article.username,
    topic: article.topic,
    title: article.title
  };
  return knex("articles")
    .insert(updatedArticle)
    .returning("*")
    .then(([article]) => {
      return { article };
    });
};

module.exports = insertArticle;
