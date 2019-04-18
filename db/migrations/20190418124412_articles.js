exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.text("body", "longtext");
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic");
    articlesTable.foreign("topic").references("topics.slug");
    articlesTable.string("author");
    articlesTable.foreign("author").references("users.username");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
