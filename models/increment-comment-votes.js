const knex = require("../db/connection");
const incrementCommentVotes = (inc_votes, comment_id) => {
  return knex("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      return { updatedComment: comment };
    });
};
module.exports = incrementCommentVotes;
