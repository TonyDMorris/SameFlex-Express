const articlesRouter = require("express").Router();
const getArticles = require("../controllers/get-articles");

articlesRouter.get("/", getArticles);
module.exports = articlesRouter;
