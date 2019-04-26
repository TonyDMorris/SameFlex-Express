const insertUser = require("../models/insert-user");
const postUser = (req, res, next) => {
  insertUser(req.body)
    .then(user => res.status(201).send(user))
    .catch(next);
};

module.exports = postUser;
