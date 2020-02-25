exports.up = function(knex) {
  return knex.schema.createTable("questions", question_table => {
    question_table
      .increments("question_id")
      .primary()
      .notNullable()
      .unique();
    question_table.string("question").notNullable();
    question_table.timestamp("startTime").notNullable();
    question_table.string("img").notNullable();
    question_table.string("questionStatus").notNullable();
    question_table.specificType("answerArray", "text ARRAY");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("questions");
};
