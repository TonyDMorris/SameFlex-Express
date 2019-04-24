const endpoints = require("./api-index");

const sendApiInfo = (req, res, next) => {
  res.status(200).send(endpoints);
};

module.exports = sendApiInfo;
