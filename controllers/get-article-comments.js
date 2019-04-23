const fetchArticleComments = require("../models/fetch-article-comments");
const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  return fetchArticleComments(article_id).then(comments => {
    res.status(200).send(comments);
  });
};

module.exports = getArticleComments;
