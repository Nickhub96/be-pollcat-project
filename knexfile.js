const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  },
  connection: {
    database: "pollcat"
  }
};

module.exports = baseConfig;
