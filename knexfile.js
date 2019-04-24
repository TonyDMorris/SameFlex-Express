const ENV = process.env.NODE_ENV || "development";

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
      database:
        "postgres://pcfnwnrmxikeej:620cd79399f0cc8a43afdc5bd0a483138de8f4a2820994cc6c792887fce4c5df@ec2-54-197-239-115.compute-1.amazonaws.com:5432/d956dde9850oph",
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
