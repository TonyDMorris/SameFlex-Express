const commentsRouter = require("express").Router();
const patchCommentVotes = require("../controllers/patch-comment-votes");
const deleteComment = require("../controllers/delete-comment");
commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotes)
  .delete(deleteComment);
module.exports = commentsRouter;
