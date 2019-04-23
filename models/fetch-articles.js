const knex = require("../db/connection");
const fetchArticles = (sort_by = "author", order = "desc", keyValue) => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author as author",
      "articles.created_at"
    )
    .count("comments.article_id as comment_count")
    .from("comments")
    .groupBy("articles.article_id")
    .leftJoin("articles", "comments.article_id", "articles.article_id")
    .where(keyValue)
    .orderBy(sort_by, order)
    .then(articles => {
      return { articles };
    });
};

module.exports = fetchArticles;
