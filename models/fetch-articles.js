const knex = require("../db/connection");
const fetchArticles = (sort_by = "author", order = "desc", author, topic) => {
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
    .from("articles")
    .groupBy("articles.article_id")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .modify(queryBuilder => {
      if (author && topic) {
        queryBuilder.where({
          "articles.author": author,
          "articles.topic": topic
        });
      } else {
        if (author) {
          queryBuilder.where({ "articles.author": author });
        }
        if (topic) {
          queryBuilder.where({ "articles.topic": topic });
        }
      }
    })
    .orderBy(sort_by, order)
    .then(articles => {
      return { articles };
    });
};

module.exports = fetchArticles;
