const knex = require("../db/connection");
const fetchArticleComments = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return knex
    .select(`comment_id`, "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .then(comments => {
      return comments;
    });
};

module.exports = fetchArticleComments;
