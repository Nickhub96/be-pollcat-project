const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: "pollcat-mysqldb-instance-1.cw9az4fgwt3t.eu-west-2.rds.amazonaws.com",
  user: "pollcatadmin",
  password: "Team.Pollcat1"
});

// post request to create a user
app.post("/users", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  if (req.query.username && req.query.email && req.query.age) {
    console.log("Request received");

    connection.connect(function(err) {
      connection.query(
        `INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`,
        function(err, result, fields) {
          if (err) res.send(err);
          if (result)
            res.send({
              username: req.query.username,
              email: req.query.email,
              age: req.query.age
            });
          if (fields) console.log(fields);
        }
      );
    });
  } else {
    console.log("Missing a parameter");
  }
});

// get request for user data
app.get("/users", (req, res) => {
  connection.connect(function(err) {
    connection.query(`SELECT * FROM main.users`, function(err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });
});

const { PORT = 9090 } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
