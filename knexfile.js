const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  connection: process.env.DATABASE_URL,
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
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
