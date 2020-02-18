exports.up = function(knex) {
  return knex.schema.createTable("responses", responsesTable => {
    responsesTable
      .increments("response_id")
      .primary()
      .notNullable();
    responsesTable.string("question").notNullable();
    responsesTable.string("response").defaultTo(null);
    responsesTable.integer("user_id").references("users.user_id");
    responsesTable.integer("location_id").references("locations.location_id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("reponses");
};
