const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const knex = require("../db/connection");
describe.only("/topics", () => {
  after(() => {
    knex.destroy();
  });
  it("GET should return a status code of 200 and an array  of topic objects proceeded by a topics key", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(topics => {
        expect(topics).to.be.an.array;
        expect(topics[0]).to.have.keys("slug", "description");
      });
  });
});
