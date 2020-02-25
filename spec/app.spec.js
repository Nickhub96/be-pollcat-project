process.env.NODE_ENV = "development";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const endpoints = require("../endpoints.json");

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/api", () => {
    it("GET:200 responds with endpoints.json", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.eql(endpoints);
        });
    });
    describe("/questions", () => {
      it("GET:200 responds with an array of all the questions", () => {
        return request(app)
          .get("/api/questions")
          .expect(200)
          .then(res => {
            expect(res.body.questions).to.be.an("array");
            expect(res.body.questions[0]).to.have.keys(
              "question_id",
              "question",
              "startTime",
              "img",
              "questionStatus",
              "answerArray"
            );
          });
      });
      it("GET:200 responds with an array of all the questions with a questionStatus query", () => {
        return request(app)
          .get("/api/questions?questionStatus=past")
          .expect(200)
          .then(res => {
            const output = res.body.questions.every(question => {
              return question.questionStatus === "past";
            });
            expect(output).to.be.true;
          });
      });
      it("POST:201 responds with the posted question", () => {
        return request(app)
          .post("/api/questions")
          .send({
            question: "new question",
            startTime: new Date(1582110398),
            img: "new_img",
            questionStatus: "future",
            answerArray: ["img1", "img2"]
          })
          .expect(201)
          .then(res => {
            expect(res.body.question).to.be.an("object");
            expect(res.body.question).to.have.keys(
              "question_id",
              "question",
              "startTime",
              "img",
              "questionStatus",
              "answerArray"
            );
            expect(res.body.question.question).to.equal("new question");
            //expect(res.body.question.startTime).to.equal("");
          });
      });
    });
    describe("/:question_id", () => {
      it("GET:200 responds with an object of a single question", () => {
        return request(app)
          .get("/api/questions/2")
          .expect(200)
          .then(res => {
            expect(res.body.question).to.be.an("object");
            expect(res.body.question.question_id).to.equal(2);
            expect(res.body.question).to.have.keys(
              "question_id",
              "question",
              "startTime",
              "img",
              "questionStatus",
              "answerArray"
            );
          });
      });
      it("PATCH:200 responds with the question that has been updated", () => {
        return request(app)
          .patch("/api/questions/3")
          .send({
            question: "KFC or Mcdonalds",
            questionStatus: "past",
            img: "new_img_url",
            answerArray: ["new_pic1", "new_pic2"]
          })
          .expect(200)
          .then(res => {
            expect(res.body.question).to.be.an("object");
            expect(res.body.question.question).to.equal("KFC or Mcdonalds");
            expect(res.body.question.questionStatus).to.equal("past");
            expect(res.body.question.img).to.equal("new_img_url");
            expect(res.body.question.answerArray).to.deep.equal([
              "new_pic1",
              "new_pic2"
            ]);
          });
      });
      it("DELETE:204 deletes a question by id", () => {
        return request(app)
          .delete("/api/questions/3")
          .expect(204);
      });
    });
  });
});
