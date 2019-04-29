const commentsRouter = require("express").Router();
const patchCommentVotes = require("../controllers/patch-comment-votes");
const deleteComment = require("../controllers/delete-comment");
const { methodNotAllowed } = require("../errors/index");
const authToken = require("../controllers/auth-token");
commentsRouter
  .route("/:comment_id")
  .patch(authToken, patchCommentVotes)
  .delete(authToken, deleteComment)
  .all(methodNotAllowed);
commentsRouter.all("/", methodNotAllowed);
module.exports = commentsRouter;
