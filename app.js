const express = require("express");
const apiRouter = require("./routes/api");

const {
  routeNotFound,
  handle500,
  customError,
  badRequest
} = require("./errors/index");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.post("/login", (req, res, next) => {});

app.all("/*", routeNotFound);

app.use(customError);
app.use(badRequest);
app.use(handle500);

module.exports = app;
