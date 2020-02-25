devData = require("../db/data/index");

const env = process.env.NODE_ENV || "development";
const allData = {
  development: devData,
  production: devData
};

module.exports = allData[env];
