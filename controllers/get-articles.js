const fetchArticles = require("../models/fetch-articles");
const getArticles = (req, res, next) => {
  const { sort_by, order, ...keyValue } = req.query;
  return fetchArticles(sort_by, order, keyValue)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
module.exports = getArticles;
