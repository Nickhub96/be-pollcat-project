const { answersData, questionsData } = require("../data-index");

const {
  formatAnswerDates,
  formatQuestionDates,
  questionRefObj,
  answerFormatter
} = require("../utils/utils.js");

console.log(process.env.NODE_ENV);

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const formattedQuestions = formatQuestionDates(questionsData);
      return (questionsInsertions = knex("questions")
        .insert(formattedQuestions)
        .returning("*"));
    })
    .then(questionsInsertions => {
      const formattedAnswerDates = formatAnswerDates(answersData);
      const questionRef = questionRefObj(questionsInsertions);
      const formattedAnswers = answerFormatter(
        formattedAnswerDates,
        questionRef
      );
      return knex("answers")
        .insert(formattedAnswers)
        .returning("*");
    })
    .catch(console.log);
};
