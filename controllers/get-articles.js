const fetchArticles = require("../models/fetch-articles");
const getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  return fetchArticles(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
module.exports = getArticles;
