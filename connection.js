const knex = require("knex");

const { baseConfig } = require("./knexfile");

const connection = knex(baseConfig);

module.exports = connection;
