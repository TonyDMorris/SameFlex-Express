const fetchUsers = require("../models/fetch-users");
const getUsers = (req, res, next) => {
  fetchUsers(req.query)
    .then(users => {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports = getUsers;
