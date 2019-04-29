const loginVerify = require("../models/login-verify");

const login = (req, res, next) => {
  return loginVerify(req.body)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
};

module.exports = login;
