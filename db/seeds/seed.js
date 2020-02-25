const { usersData, answersData, questionsData } = require("../data-index");

const {
  formatAnswerDates,
  formatQuestionDates,
  questionRefObj,
  userRefObj,
  answerFormatter
} = require("../utils/utils.js");

console.log(process.env.NODE_ENV);

exports.seed = function(knex) {
  console.log("seeding");
  return knex.migrate
    .rollback()
    .then(() => {
      console.log("rolledback");
      return knex.migrate.latest();
    })
    .then(() => {
      console.log("mig latest");
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
    })
    .catch(console.log);
};
