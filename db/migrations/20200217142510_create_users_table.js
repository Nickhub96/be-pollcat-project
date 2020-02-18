exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .increments("user_id")
      .primary()
      .notNullable();
    usersTable.string("username").notNullable();
    usersTable.string("firstName").notNullable();
    usersTable.string("lastName").notNullable();
    usersTable.string("avatar_url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
