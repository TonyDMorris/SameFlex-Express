const fetchArticles = require("../models/fetch-articles");
const fetchUserByUsername = require("../models/fetch-user-by-username");
const getArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit, page } = req.query;
  const { article_id } = req.params;

  return Promise.all([
    fetchArticles(sort_by, order, author, topic, article_id, limit, page),
    author ? fetchUserByUsername(author) : { user: true }
  ])
    .then(([articles, { user }]) => {
      console.log(user);
      if (!user) {
        const err = { msg: "no such user", status: 404 };
        return Promise.reject(err);
      } else if (!articles.article && !articles.articles[0]) {
        const err = { msg: "no articles", status: 404 };
        return Promise.reject(err);
      }
      res.status(200).send(articles);
    })
    .catch(next);
};
module.exports = getArticles;
