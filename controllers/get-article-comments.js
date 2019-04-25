const fetchArticleComments = require("../models/fetch-article-comments");
const getArticleComments = (req, res, next) => {
  const { sort_by, order, limit, page } = req.query;
  const { article_id } = req.params;
  fetchArticleComments(article_id, sort_by, order, limit, page)
    .then(comments => {
      if (!comments[0]) {
        const err = {
          status: 404,
          msg: "no comments for this article or no article exists"
        };
        return Promise.reject(err);
      } else {
        res.status(200).send(comments);
      }
    })
    .catch(next);
};

module.exports = getArticleComments;
