const apiRouter = require("express").Router();
const { topicsRouter } = require("./index");
const { methodNotAllowed } = require("../errors");

apiRouter
  .get("/", (req, res) => res.send({ ok: true }))
  .use("/topics", topicsRouter)
  .all(methodNotAllowed);

module.exports = apiRouter;
