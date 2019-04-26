const knex = require("../db/connection");
const incrementCommentVotes = (inc_votes = 0, comment_id) => {
  return knex("comments")
    .where({ comment_id })
    .increment("votes", +inc_votes)
    .returning("*")
    .then(([comment]) => {
      return { comment };
    });
};
module.exports = incrementCommentVotes;
