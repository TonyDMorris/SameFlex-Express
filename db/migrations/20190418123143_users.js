exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .unique()
      .primary()
      .notNull();
    usersTable
      .string("avatar_url")
      .defaultsTo(
        "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
      );
    usersTable.string("name").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
