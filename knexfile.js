const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
const baseConfig = {
  client: "pg",

  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "nc_news",
      username: "tony",
      password: "password"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "tony",
      password: "password"
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
