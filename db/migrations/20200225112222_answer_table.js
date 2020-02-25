exports.up = function(knex) {
  return knex.schema.createTable("answers", answer_table => {
    answer_table
      .increments("answer_id")
      .primary()
      .notNullable()
      .unique();
    answer_table.integer("answerIndex").notNullable();
    answer_table.string("userUid").notNullable();
    answer_table
      .integer("question_id")
      .references("questions.question_id")
      .notNullable();

    answer_table
      .string("townName")
      .notNullable()
      .defaultTo("Manchester City Centre");
    answer_table
      .string("countyName")
      .notNullable()
      .defaultTo("Greater Manchester");
    answer_table
      .timestamp("timePosted")
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("answers");
};
