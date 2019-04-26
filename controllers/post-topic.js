const insertTopic = require("../models/insert-topic");
const postTopic = (req, res, next) => {
  insertTopic(req.body)
    .then(topic => {
      res.status(201).send(topic);
    })
    .catch(next);
};
module.exports = postTopic;
