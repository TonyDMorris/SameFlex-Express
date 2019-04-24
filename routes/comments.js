const commentsRouter = require("express").Router();
const patchCommentVotes = require("../controllers/patch-comment-votes");
commentsRouter.route("/:comment_id").patch(patchCommentVotes);
module.exports = commentsRouter;
