const apiRouter = require("express").Router();
const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
const { methodNotAllowed } = require("../errors");

apiRouter
  .get("/", (req, res) => res.send({ ok: true }))
  .use("/topics", topicsRouter)
  .use("/articles", articlesRouter)
  .use("/comments", commentsRouter)
  .use("/users", usersRouter)
  .all(methodNotAllowed);

module.exports = apiRouter;
