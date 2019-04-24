const knex = require("../db/connection");

const removeComment = comment_id => {
  return knex("comments")
    .where({ comment_id })
    .del();
};
module.exports = removeComment;
