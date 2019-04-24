const knex = require("../db/connection");
const fetchArticleComments = article_id => {
  return knex
    .select(`comment_id`, "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", article_id)
    .then(comments => {
      return comments;
    });
};

module.exports = fetchArticleComments;
