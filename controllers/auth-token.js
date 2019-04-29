const jwt = require("jsonwebtoken");
const authToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    return jwt.verify(token, "secret", (err, token) => {
      if (err) {
        res.status(403).send({ error: { msg: "token must be brovided" } });
      } else {
        next();
      }
    });
  } else {
    //If header is undefined return Forbidden (403)
    res.status(403).send({ error: { msg: "token must be brovided" } });
  }
};

module.exports = authToken;
