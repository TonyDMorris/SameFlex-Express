const topicsRouter = require("express").Router();
const getTopics = require("../controllers/get-topics");
const { methodNotAllowed } = require("../errors");
topicsRouter.get("/", getTopics);
topicsRouter.all("/", methodNotAllowed);
module.exports = topicsRouter;
