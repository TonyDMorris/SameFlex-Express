const knex = require("../db/connection");
const incrementVotes = (inc_votes = 0, article_id) => {
  return knex("articles")
    .where({ article_id })
    .increment("votes", +inc_votes)
    .returning("*")
    .then(([article]) => {
      return { article };
    });
};
module.exports = incrementVotes;
