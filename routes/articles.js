const articlesRouter = require("express").Router();
const getArticles = require("../controllers/get-articles");
const patchVotes = require("../controllers/patchVotes");
const getArticleComments = require("../controllers/get-article-comments");
const postComment = require("../controllers/post-comment");
const postArticle = require("../controllers/post-article");
const deleteArticle = require("../controllers/delete-article");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .post(postArticle)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(getArticles)
  .patch(patchVotes)
  .delete(deleteArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postComment)
  .all(methodNotAllowed);
module.exports = articlesRouter;
