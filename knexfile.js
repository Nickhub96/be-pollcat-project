const ENV = process.env.NODE_ENV || "test";

console.log(ENV, "ENV ******");

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
      host: "database-1.cw9az4fgwt3t.eu-west-2.rds.amazonaws.com",
      user: "postgres",
      password: "Team.Pollcat1",
      database: "pollcatDB",
      rejectUnauthorized: false
    }

    // connection:
    //   "postgresql://database-1.cw9az4fgwt3t.eu-west-2.rds.amazonaws.com:5432/pollcatDB?ssl=true"
  },
  test: {
    connection: {
      database: "pollcat"
    }
  }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
