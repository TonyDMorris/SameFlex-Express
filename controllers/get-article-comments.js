const fetchArticleComments = require("../models/fetch-article-comments");
const fetchArticles = require("../models/fetch-articles");
const getArticleComments = (req, res, next) => {
  const { sort_by, order, limit, page } = req.query;
  const { article_id } = req.params;
  const nowt = undefined;
  return Promise.all([
    fetchArticles(nowt, nowt, nowt, nowt, article_id, nowt, nowt),
    fetchArticleComments(article_id, sort_by, order, limit, page)
  ])
    .then(([article, comments]) => {
      if (!article.article) {
        const err = {
          status: 404,
          msg: "article not found"
        };
        return Promise.reject(err);
      } else {
        res.status(200).send(comments);
      }
    })
    .catch(next);
};

module.exports = getArticleComments;
