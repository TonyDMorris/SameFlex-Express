const apiRouter = require("express").Router();
const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const { methodNotAllowed } = require("../errors");

apiRouter
  .get("/", (req, res) => res.send({ ok: true }))
  .use("/topics", topicsRouter)
  .use("/articles", articlesRouter)
  .use("/comments", commentsRouter)
  .all(methodNotAllowed);

module.exports = apiRouter;
