const knex = require("../db/connection");
const fetchArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic,
  id,
  limit = 5,
  page = 1
) => {
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
      if (author) {
        queryBuilder.where({ "articles.author": author });
      }
      if (topic) {
        queryBuilder.where({ "articles.topic": topic });
      }
      if (id) {
        queryBuilder.where({ "articles.article_id": id });
      }
    })
    .limit(limit)
    .offset(page * limit - limit)
    .orderBy(sort_by, order)
    .then(articles => {
      if (articles.length === 1) {
        const [article] = articles;
        return { article };
      } else {
        return { articles };
      }
    });
};

module.exports = fetchArticles;
