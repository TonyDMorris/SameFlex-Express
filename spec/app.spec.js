process.env.NODE_ENV = "test";

const { expect } = require("chai");

const app = require("../app");
const knex = require("../db/connection");

const request = require("supertest");

describe("/", () => {
  beforeEach(() => knex.seed.run());
  after(() => knex.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });
  describe("/topics", () => {
    it("GET should return a status code of 200 and an array  of topic objects proceeded by a topics key", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(data => {
          const { topics } = data.body;
          expect(topics).to.be.an("array");
          expect(topics[0]).to.have.keys("slug", "description");
        });
    });
    it("POST,PUT,PATCH,AND DELETE should all return a 405 method not allowed error", () => {
      return request(app)
        .post("/api/topics")
        .expect(405)
        .then(err => {
          const { msg } = err.body;
          expect(msg).to.eql("Method Not Allowed");
        });
    });
    it("POST,PUT,PATCH,AND DELETE should all return a 405 method not allowed error", () => {
      return request(app)
        .put("/api/topics")
        .expect(405)
        .then(err => {
          const { msg } = err.body;
          expect(msg).to.eql("Method Not Allowed");
        });
    });
    it("POST,PUT,PATCH,AND DELETE should all return a 405 method not allowed error", () => {
      return request(app)
        .patch("/api/topics")
        .expect(405)
        .then(err => {
          const { msg } = err.body;
          expect(msg).to.eql("Method Not Allowed");
        });
    });
    it("POST,PUT,PATCH,AND DELETE should all return a 405 method not allowed error", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(err => {
          const { msg } = err.body;
          expect(msg).to.eql("Method Not Allowed");
        });
    });
  });
});
