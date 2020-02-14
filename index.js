const express = require("express");
const app = express();
const { data } = require("../be-pollcat-project/data");

app.get("/", function(req, res) {
  res.send(data);
});
