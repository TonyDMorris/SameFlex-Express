const articlesRouter = require("express").Router();
const getArticles = require("../controllers/get-articles");
const patchVotes = require("../controllers/patchVotes");
const getArticleComments = require("../controllers/get-article-comments");
articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticles);
articlesRouter.patch("/:article_id", patchVotes);
articlesRouter.get("/:article_id/comments", getArticleComments);
module.exports = articlesRouter;
