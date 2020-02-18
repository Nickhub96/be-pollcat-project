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
  development: { connection: { database: "pollcat" } },
  test: { connection: { database: "pollcat_test" } }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
