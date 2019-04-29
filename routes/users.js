const usersRouter = require("express").Router();
const getUserByUsername = require("../controllers/get-user-by-username");

const getUsers = require("../controllers/get-users");
const { methodNotAllowed } = require("../errors/index");
usersRouter.route("/:username").get(getUserByUsername);
usersRouter
  .route("/")
  .get(getUsers)
  .all(methodNotAllowed);
module.exports = usersRouter;
