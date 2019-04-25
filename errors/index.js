exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.badRequest = (err, req, res, next) => {
  const psqlCodes = {
    "42703": { code: 400, text: "bad query or malformed body of post request" },
    "22P02": { code: 404, text: "no id exists" },
    "23502": {
      code: 400,
      text: "malformed post body please recheck and try again"
    }
  };
  if (psqlCodes[err.code]) {
    console.log(err);
    res.status(psqlCodes[err.code].code).send(psqlCodes[err.code].text);
  } else {
    next(err);
  }
};

exports.customError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.msg);
  } else {
    next(err);
  }
};
