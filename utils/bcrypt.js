const bcrypt = require("bcrypt");

const passHash = password => {
  return bcrypt
    .genSalt(5)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return hash;
    })
    .catch(err => {
      throw err;
    });
};

module.exports = passHash;
