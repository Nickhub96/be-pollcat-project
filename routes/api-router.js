const apiRouter = require("express").Router();
const questionsRouter = require("./questions-router");
const { sendApiEndpoints } = require("../controllers/api-controller");

apiRouter.route("/").get(sendApiEndpoints);

apiRouter.use("/questions", questionsRouter);

module.exports = apiRouter;
