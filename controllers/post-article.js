const insertArticle = require("../models/insert-article");
const postArticle = (req, res, next) => {
  const article = req.body;
  insertArticle(article)
    .then(article => {
      res.status(201).send(article);
    })
    .catch(next);
};

module.exports = postArticle;
