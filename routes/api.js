const apiRouter = require("express").Router();
const { topicsRouter } = require("./index");
articlesRouter = require("./articles");
const { methodNotAllowed } = require("../errors");

apiRouter
  .get("/", (req, res) => res.send({ ok: true }))
  .use("/topics", topicsRouter)
  .use("/articles", articlesRouter)
  .all(methodNotAllowed);

module.exports = apiRouter;
