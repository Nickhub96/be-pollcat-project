exports.up = function(knex) {
  return knex.schema.createTable("questions", question_table => {
    question_table
      .increments("question_id")
      .primary()
      .notNullable()
      .unique();
    question_table.string("question").notNullable();
    question_table.timestamp("startTime").notNullable();
    question_table.string("status").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("questions");
};
