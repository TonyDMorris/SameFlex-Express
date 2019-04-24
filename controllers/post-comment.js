const insertComment = require("../models/insert-comment");
const postComment = (req, res, next) => {
  const { body, username } = req.body;
  const { article_id } = req.params;
  if (!body || !username || !article_id) {
    const err = {
      msg: "malformed body or missing paramater please correct before resubmit",
      status: 400
    };
    return next(err);
  }

  insertComment(body, username, article_id)
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(next);
};
module.exports = postComment;
