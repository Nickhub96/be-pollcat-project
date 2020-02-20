exports.up = function(knex) {
  return knex.schema.createTable("users", users_table => {
    users_table
      .increments("user_id")
      .primary()
      .unique();

    users_table.string("username").notNullable();
    users_table.string("UID").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
