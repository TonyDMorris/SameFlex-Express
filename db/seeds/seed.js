const { knex } = require("../connection");
const { topics, users, articles, comments } = require("../data/index");
exports.seed = (knex, Promise) => {
  console.log(topics);
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(topics)
        .into("topics")
        .returning("*");
    })
    .then(topicsData => {
      return Promise.all([
        knex
          .insert(users)
          .into("users")
          .returning("*"),
        topicsData
      ]);
    })
    .then(values => {
      const [userData, topicsData] = values;
      const mappedArticles = articles.map(article => {
        const date = new Date(article.created_at);
        const { created_at, ...rest } = article;

        return { ["created_at"]: date, ...rest };
      });
      return Promise.all([
        knex
          .insert(mappedArticles)
          .into("articles")
          .returning("*"),
        userData,
        topicsData
      ]);
    })
    .then(values => {
      const [articlesData, userData, topicsData] = values;
      console.log(userData, topicsData, articlesData);
    });
};
