const express = require("express");
const { apiRouter } = require("./routes/index");
const { routeNotFound, handle500 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.msg);
  } else {
    handle500();
  }
});

module.exports = app;
