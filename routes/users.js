const usersRouter = require("express").Router();
const getUserByUsername = require("../controllers/get-user-by-username");
const { methodNotAllowed } = require("../errors/index");
usersRouter.route("/:username").get(getUserByUsername);
usersRouter.all("/", methodNotAllowed);
module.exports = usersRouter;
