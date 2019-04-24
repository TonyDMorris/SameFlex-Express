const ENV = process.env.NODE_ENV || "development";

const development = require("./dev-data");
const production = require("./dev-data");
const test = require("./test-data");

const data = {
  production,
  development,
  test
};

module.exports = data[ENV];
