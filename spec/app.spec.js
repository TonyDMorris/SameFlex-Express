process.env.NODE_ENV = "test";

const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
const app = require("../app");
const knex = require("../db/connection");

const request = require("supertest");

describe.only("/", () => {
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
      it("POST should return a 405 method not allowed error", () => {
        return request(app)
          .post("/api/topics")
          .expect(405)
          .then(err => {
            const { msg } = err.body;
            expect(msg).to.eql("Method Not Allowed");
          });
      });
      it("PUT should return a 405 method not allowed error", () => {
        return request(app)
          .put("/api/topics")
          .expect(405)
          .then(err => {
            const { msg } = err.body;
            expect(msg).to.eql("Method Not Allowed");
          });
      });
      it("PATCH should all return a 405 method not allowed error", () => {
        return request(app)
          .patch("/api/topics")
          .expect(405)
          .then(err => {
            const { msg } = err.body;
            expect(msg).to.eql("Method Not Allowed");
          });
      });
      it("DELETE should all return a 405 method not allowed error", () => {
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
  describe("/articles", () => {
    it("GET should return a status code of 200 and an array of articles proceeded by an articles key", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;
          expect(articles[0]).to.have.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );

          expect(articles).to.be.an("array");
          expect(articles[0].article_id).to.be.a("number");
          expect(articles[0].title).to.be.a("string");
          expect(articles[0].body).to.be.a("string");
          expect(articles[0].topic).to.be.a("string");
          expect(articles[0].author).to.be.a("string");
          expect(articles[0].votes).to.be.a("number");
        });
    });
    it("should be sorted by author by default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;
          expect(articles).to.be.descendingBy("author");
        });
    });
    it("accept a custom query to sort by ", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles).to.be.descendingBy("votes");
        });
    });
    it("accepts an optional order query to for order direction of sort by", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=asc")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles).to.be.ascendingBy("votes");
        });
    });
    it("accept a author query", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles[0].author).to.eql("icellusedkars");
        });
    });
    it("accepts a topic query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles[0].topic).to.eql("mitch");
        });
    });
    it("both quries can be used together", () => {
      return request(app)
        .get("/api/articles?topic=mitch&author=rogersop")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles[0].author).to.eql("rogersop");
          expect(articles[0].topic).to.eql("mitch");
        });
    });
  });
});
