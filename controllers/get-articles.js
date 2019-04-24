const fetchArticles = require("../models/fetch-articles");
const getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  const { article_id } = req.params;

  fetchArticles(sort_by, order, author, topic, article_id)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
module.exports = getArticles;
