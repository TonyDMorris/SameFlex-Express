const topicsRouter = require("express").Router();
const getTopics = require("../controllers/get-topics");
const postTopic = require("../controllers/post-topic");
const { methodNotAllowed } = require("../errors");
topicsRouter
  .route("/")
  .get(getTopics)
  .post(postTopic)
  .all(methodNotAllowed);

module.exports = topicsRouter;
