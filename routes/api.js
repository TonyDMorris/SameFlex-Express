const apiRouter = require("express").Router();
const topicsRouter = require("./topics");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const usersRouter = require("./users");
const sendApiInfo = require("../controllers/send-api-info");
const { methodNotAllowed } = require("../errors");

apiRouter
  .get("/", sendApiInfo)
  .use("/topics", topicsRouter)
  .use("/articles", articlesRouter)
  .use("/comments", commentsRouter)
  .use("/users", usersRouter)
  .all("/", methodNotAllowed);

module.exports = apiRouter;
