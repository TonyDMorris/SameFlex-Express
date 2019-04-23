const knex = require("../db/connection");
const fetchArticles = () => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .count("comments.article_id as comment_count")
    .from("comments")
    .groupBy("articles.article_id")
    .leftJoin("articles", "comments.article_id", "articles.article_id")
    .then(articles => {
      return { articles };
    });
};

module.exports = fetchArticles;
