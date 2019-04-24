const commentsRouter = require("express").Router();
const patchCommentVotes = require("../controllers/patch-comment-votes");
const deleteComment = require("../controllers/delete-comment");
const { methodNotAllowed } = require("../errors/index");
commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotes)
  .delete(deleteComment)
  .all(methodNotAllowed);
module.exports = commentsRouter;
