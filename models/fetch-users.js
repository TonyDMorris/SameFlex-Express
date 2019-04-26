const knex = require("../db/connection");
const fetchUsers = ({
  limit = 5,
  sort_by = "username",
  order = "desc",
  page = 1
}) => {
  return knex("users")
    .select("*")
    .orderBy(sort_by, order)
    .limit(limit)
    .offset(page * limit - limit)
    .then(users => {
      return { users };
    });
};

module.exports = fetchUsers;
