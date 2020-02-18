exports.up = function(knex) {
  return knex.schema.createTable("locations", locationsTable => {
    locationsTable
      .increments("location_id")
      .primary()
      .notNullable();
    locationsTable.decimal("longitude").notNullable();
    locationsTable.decimal("latitude").notNullable();
    locationsTable.json("geocodeLocation").defaultTo(null);
    locationsTable.integer("user_id").references("users.user_id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("locations");
};
