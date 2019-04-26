const insertComment = require("../models/insert-comment");
const fetchArticles = require("../models/fetch-articles");
const postComment = (req, res, next) => {
  const { body, username } = req.body;
  const { article_id } = req.params;
  const nowt = undefined;
  return Promise.all([
    fetchArticles(nowt, nowt, nowt, nowt, article_id, nowt, nowt),
    insertComment(body, username, article_id)
  ])
    .then(([article, comment]) => {
      if (!article.article) {
        const err = { msg: "no such article", status: "404" };
        return Promise.reject(err);
      } else {
        res.status(201).send(comment);
      }
    })
    .catch(next);
};
module.exports = postComment;
