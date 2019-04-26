const incrementCommentVotes = require("../models/increment-comment-votes");
const patchCommentVotes = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  if (/\D/g.test(comment_id)) {
    const err = {
      msg:
        "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
      status: 400
    };
    return next(err);
  }
  incrementCommentVotes(inc_votes, comment_id)
    .then(comment => {
      if (!comment.comment) {
        const err = { msg: "no such comment", status: 404 };
        return Promise.reject(err);
      }

      res.status(200).send(comment);
    })
    .catch(next);
};

module.exports = patchCommentVotes;
