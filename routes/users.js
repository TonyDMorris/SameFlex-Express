const usersRouter = require("express").Router();
const getUserByUsername = require("../controllers/get-user-by-username");
const postUser = require("../controllers/post-user");
const { methodNotAllowed } = require("../errors/index");
usersRouter.route("/:username").get(getUserByUsername);
usersRouter
  .route("/")
  .post(postUser)
  .all(methodNotAllowed);
module.exports = usersRouter;
