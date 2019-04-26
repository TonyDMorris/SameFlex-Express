exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").notNull();
    commentsTable.foreign("author").references("users.username");
    commentsTable.integer("article_id").notNull();
    commentsTable
      .foreign("article_id")
      .references("articles.article_id")
      .onDelete("cascade");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body", "longtext").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
