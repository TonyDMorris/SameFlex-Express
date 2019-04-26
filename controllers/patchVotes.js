const incrementVotes = require("../models/increment-votes");
const patchVotes = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  if (/\D/g.test(article_id)) {
    const err = {
      msg:
        "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
      status: 400
    };
    return next(err);
  }
  incrementVotes(inc_votes, +article_id)
    .then(article => {
      if (!article.article) {
        const err = { msg: "no such article", status: 404 };
        return Promise.reject(err);
      }

      res.status(200).send(article);
    })
    .catch(next);
};

module.exports = patchVotes;
