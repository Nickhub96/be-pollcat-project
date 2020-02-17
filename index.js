const express = require("express");
const app = express();
const port = 4001;
const { data } = require("../be-pollcat-project/data");

app.get("/", function(req, res) {
  res.send(data);
});

app.listen(port, () => {
  console.log("listening");
});
module.exports = app;
