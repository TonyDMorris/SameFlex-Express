const knex = require("../db/connection");
const incrementVotes = (inc_votes, article_id) => {
  if (!inc_votes) {
    const err = {
      msg:
        "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
      status: 400
    };
    throw err;
  }

  if (!article_id) {
    const err = {
      msg:
        "Malformed article_id param. The client SHOULD NOT repeat the request without modifications",
      status: 422
    };
    throw err;
  }
  return knex("articles")
    .where({ article_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      return { updatedArticle: article };
    });
};
module.exports = incrementVotes;
