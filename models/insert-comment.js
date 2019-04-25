const knex = require("../db/connection");
const insertComment = (body, username, article_id) => {
  const comment = {
    article_id: article_id,
    author: username,
    votes: 0,
    body: body
  };

  return knex("comments")
    .insert(comment)
    .returning("*")
    .then(([comment]) => {
      return { comment };
    });
};
module.exports = insertComment;
