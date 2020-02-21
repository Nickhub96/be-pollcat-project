exports.up = function(knex) {
  console.log("cerating answers table");
  return knex.schema.createTable("answers", answer_table => {
    answer_table
      .increments("answer_id")
      .primary()
      .notNullable()
      .unique();
    answer_table.string("answer").notNullable();
    answer_table
      .integer("user_id")
      .references("users.user_id")
      .notNullable();
    answer_table
      .integer("question_id")
      .references("questions.question_id")
      .notNullable();
    answer_table.decimal("longitude").notNullable();
    answer_table
      .decimal("latitude")
      .notNullable()
      .defaultTo(null);
    answer_table
      .string("location")
      .notNullable()
      .defaultTo(null);
    answer_table
      .timestamp("timePosted")
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function(knex) {
  console.log("dropping answers table");
  return knex.schema.dropTable("answers");
};
