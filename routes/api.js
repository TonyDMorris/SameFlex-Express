const apiRouter = require("express").Router();
const { topicsRouter } = require("./index");
const { methodNotAllowed } = require("../errors");

apiRouter
  .route("/")
  .get("/topics", topicsRouter)
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
