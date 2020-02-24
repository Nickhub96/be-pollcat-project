const ENV = process.env.NODE_ENV || "test";

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

const customConfig = {
  production: {
    connection: {
      connection: `${DB_URL}?ssl=true`
      // host: "database-1.cw9az4fgwt3t.eu-west-2.rds.amazonaws.com",
      // user: "postgres",
      // password: "Team.Pollcat1",
      // database: "pollcatDB",
      // rejectUnauthorized: false
    }
  },
  test: {
    connection: {
      database: "pollcat"
    }
  }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
