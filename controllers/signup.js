const validateUserEnrol = require("../models/validate-user-enrol");
const signUp = (req, res, next) => {
  return validateUserEnrol(req.body)
    .then(username => {
      res.status(201).send(username);
    })
    .catch(next);
};

module.exports = signUp;
