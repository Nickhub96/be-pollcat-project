const { usersData, answersData, questionsData } = require("../data/index");

const { formatAnswerDates, formatQuestionDates } = require("../utils/utils.js");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex("users")
        .insert(usersData)
        .returning("*");
    })
    .then(() => {
      const formattedAnswers = formatAnswerDates(answersData);
      return knex("answers")
        .insert(formattedAnswers)
        .returning("*");
    })
    .then(() => {
      const formattedQuestions = formatQuestionDates(questionsData);
      return knex("questions")
        .insert(formattedQuestions)
        .returning("*");
    });
};

// const connection = mysql.createConnection({
//   host: "pollcat-mysqldb-instance-1.cw9az4fgwt3t.eu-west-2.rds.amazonaws.com",
//   user: "pollcatadmin",
//   password: "Team.Pollcat1"
// });

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

//   connection.query("CREATE DATABASE IF NOT EXISTS main;");
//   connection.query("USE main;");
//   connection.query(
//     "CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));",
//     function(error, result, fields) {
//       console.log(result);
//       console.log(fields);
//     }
//   );

//   connection.end();
// });
