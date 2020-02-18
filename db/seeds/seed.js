const {
  userData,
  locationData,
  voteResponseData
} = require("../../test-data/index");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const userInsertions = knex("users")
        .insert(userData)
        .returning("*");
      const locationInsertions = knex("locations")
        .insert(locationData)
        .returning("*");
      const voteResponseInsertions = knex("responses")
        .insert(voteResponseData)
        .returning("*");

      return Promise.all([
        userInsertions,
        locationInsertions,
        voteResponseInsertions
      ]);
    })
    .catch(err => console.log(err));
};
