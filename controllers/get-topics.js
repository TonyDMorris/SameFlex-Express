const fetchTopics = require("../models/fetch-topics");
const getTopics = (req, res, next) => {
  return fetchTopics().then(topics => {
    res.status(200).send(topics);
  });
};
