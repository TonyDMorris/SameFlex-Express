const { createRef, formatDate, renameKeys } = require("../../utils/utils");
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
      const [userData] = values;
      const mappedArticles = formatDate(articles);
      return Promise.all([
        knex
          .insert(mappedArticles)
          .into("articles")
          .returning("*"),
        userData
      ]);
    })
    .then(values => {
      const [articlesData, userData] = values;
      const articleRef = createRef(articlesData, "title", "article_id");
      const authorRef = createRef(userData, "username", "username");
      const adjustedComments = renameKeys(
        formatDate(
          renameKeys(comments, "belongs_to", "article_id", articleRef)
        ),
        "created_by",
        "author",
        authorRef
      );
      return knex
        .insert(adjustedComments)
        .into("comments")
        .returning("*");
    })
    .then(comments => {
      console.log("finished seeding");
    });
};
