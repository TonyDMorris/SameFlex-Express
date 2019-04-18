exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTable => {
    topicsTable.string("username").primary();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
