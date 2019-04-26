const removeArticle = require("../models/remove-article");

const deleteArticle = (req, res, next) => {
  const { article_id } = req.params;

  removeArticle(article_id)
    .then(check => {
      if (check !== 1) {
        const err = { msg: "no article by that id", status: 404 };
        return Promise.reject(err);
      }
      res.status(204).send();
    })
    .catch(next);
};
module.exports = deleteArticle;
