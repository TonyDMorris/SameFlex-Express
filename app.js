const express = require("express");
const apiRouter = require("./routes/api");
const login = require("./controllers/login");

const {
  routeNotFound,
  handle500,
  customError,
  badRequest
} = require("./errors/index");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.post("/login", login);

app.all("/*", routeNotFound);

app.use(customError);
app.use(badRequest);
app.use(handle500);

module.exports = app;
