const apiRouter = require("express").Router();
const { sendApiEndpoints } = require("../controllers/api-controller");

apiRouter.route("/").get(sendApiEndpoints);

module.exports = apiRouter;
