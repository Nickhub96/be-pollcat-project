const { usersData, answersData, questionsData } = require("../data/index");

const {
  formatAnswerDates,
  formatQuestionDates,
  questionRefObj,
  userRefObj,
  answerFormatter
} = require("../utils/utils.js");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const formattedQuestions = formatQuestionDates(questionsData);
      const questionsInsertions = knex("questions")
        .insert(formattedQuestions)
        .returning("*");
      const userInsertions = knex("users")
        .insert(usersData)
        .returning("*");
      return Promise.all([questionsInsertions, userInsertions]);
    })
    .then(([questionsInsertions, userInsertions]) => {
      console.log(questionsInsertions);
      const formattedAnswerDates = formatAnswerDates(answersData);
      const questionRef = questionRefObj(questionsInsertions);
      const userRef = userRefObj(userInsertions);
      const formattedAnswers = answerFormatter(
        formattedAnswerDates,
        questionRef,
        userRef
      );
      return knex("answers")
        .insert(formattedAnswers)

        .returning("*");
    });
};
