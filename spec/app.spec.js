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
              "status",
              "answerArray"
            );
          });
      });
    });
  });
});
