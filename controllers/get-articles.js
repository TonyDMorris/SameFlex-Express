const fetchArticles = require("../models/fetch-articles");
const getArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit, page } = req.query;
  const { article_id } = req.params;

  fetchArticles(sort_by, order, author, topic, article_id, limit, page)
    .then(articles => {
      res.status(200).send(articles);
    })
    .catch(next);
};
module.exports = getArticles;
