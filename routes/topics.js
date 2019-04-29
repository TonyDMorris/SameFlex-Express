const topicsRouter = require("express").Router();
const getTopics = require("../controllers/get-topics");
const postTopic = require("../controllers/post-topic");
const { methodNotAllowed } = require("../errors");
const authToken = require("../controllers/auth-token");
topicsRouter
  .route("/")
  .get(getTopics)
  .post(authToken, postTopic)
  .all(methodNotAllowed);

module.exports = topicsRouter;
