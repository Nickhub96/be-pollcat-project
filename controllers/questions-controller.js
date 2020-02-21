const {
  selectQuestions,
  selectQuestionById,
  updateQuestionById,
  removeQuestionById,
  insertQuestion
} = require("../models/questions-model");

exports.getQuestions = (req, res, next) => {
  selectQuestions(req.query)
    .then(questions => {
      res.status(200).send({ questions });
    })
    .catch(err => {
      next(err);
    });
};

exports.getQuestionById = (req, res, next) => {
  selectQuestionById(req.params)
    .then(([question]) => {
      res.status(200).send({ question });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchQuestionById = (req, res, next) => {
  updateQuestionById(req.params, req.body)
    .then(([question]) => {
      res.status(200).send({ question });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteQuestionById = (req, res, next) => {
  removeQuestionById(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
};

exports.postQuestion = (req, res, next) => {
  insertQuestion(req.body)
    .then(question => {
      res.status(201).send({ question });
    })
    .catch(err => {
      next(err);
    });
};
