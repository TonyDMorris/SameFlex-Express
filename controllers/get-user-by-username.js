const fetchUserByUsername = require("../models/fetch-user-by-username");
const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      if (!user[0]) {
        const err = { msg: "user not found", status: 404 };
        return Promise.reject(err);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = getUserByUsername;
