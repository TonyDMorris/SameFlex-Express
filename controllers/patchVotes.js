const incrementVotes = require("../models/increment-votes");
const patchVotes = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  incrementVotes(inc_votes, +article_id)
    .then(votes => {
      res.status(201).send(votes);
    })
    .catch(next);
};

module.exports = patchVotes;
