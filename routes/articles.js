const articlesRouter = require("express").Router();
const getArticles = require("../controllers/get-articles");
const patchVotes = require("../controllers/patchVotes");
articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticles);
articlesRouter.patch("/:article_id", patchVotes);
module.exports = articlesRouter;
