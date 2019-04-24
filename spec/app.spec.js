process.env.NODE_ENV = "test";

const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
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
    it("both querys can be used together", () => {
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
  describe("GET /api/articles/:article_id", () => {
    it("when given a paramter of 1 should return an article with the given article id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles[0].article_id).to.eql(1);
        });
    });
    it("when given a paramter of 2 should return an article with the given article id", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body.articles;

          expect(articles[0].article_id).to.eql(2);
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    it("when given a paramter of 1 should return an article with the given article id", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 2 })
        .expect(201)
        .then(({ body }) => {
          const article = body.updatedArticle[0];
          expect(article.votes).to.eql(2);
        });
    });
    it("PATCH when passed an object copntaining inc_votes it increments the given article id by the given number of votes", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 5 })
        .expect(201)
        .then(({ body }) => {
          const article = body.updatedArticle[0];
          expect(article.votes).to.eql(5);
        });
    });

    it("PATCH when passed an object copntaining inc_votes it increments the given article id by the given number of votes", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 5 })
        .expect(201)
        .then(({ body }) => {
          const article = body.updatedArticle[0];
          expect(article.votes).to.eql(5);
        });
    });
    it("PATCH when passed an object copntaining inc_votes can be used to decrease votes", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: -5 })
        .expect(201)
        .then(({ body }) => {
          const article = body.updatedArticle[0];
          expect(article.votes).to.eql(-5);
        });
    });
    it("will check for invalid vote increments ", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({})
        .expect(400)
        .then(({ error }) => {
          expect(error.text).to.eql(
            "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          );
        });
    });
    it("will check for malformed a param", () => {
      return request(app)
        .patch("/api/articles/d")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(({ error }) => {
          expect(error.text).to.eql(
            "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          );
        });
    });
  });
  describe("/api/article_id/comments", () => {
    it("GET 200 returns an array of comments for the relevant article", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .then(({ body }) => {
          expect(body).to.be.an("array");
          expect(body[0]).to.have.keys(
            `comment_id`,
            "votes",
            "created_at",
            "author",
            "body"
          );
          expect(body[0].comment_id).to.be.an("number");
          expect(body[0].votes).to.be.an("number");
          expect(body[0].author).to.be.an("string");
          expect(body[0].body).to.be.an("string");
          expect(body[0].created_at).to.be.an("string");
        });
    });
    it("non articles should return a message and a 404 status code", () => {
      return request(app)
        .get("/api/articles/500/comments")
        .expect(404)
        .then(error => {
          expect(error.text).to.eql(
            "no comments for this article or no article exists"
          );
        });
    });
    it("sorts by default to created at in desc order", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.descendingBy("created_at");
        });
    });
    it("accepts a sort_by column as a query and an order ", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=author&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.ascendingBy("author");
        });
    });
  });
  describe("POST api/articles/:article_id/comments", () => {
    it("returns a status of 201 created and the created comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          body: "this is a brand new comment",
          username: "icellusedkars"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body[0]).to.have.keys(
            "article_id",
            "author",
            "body",
            "comment_id",
            "votes",
            "created_at"
          );
        });
    });
    it("returns 400 if the body of the request is malformed", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          bidy: "this is a brand new comment",
          username: "icellusedkars"
        })
        .expect(400);
    });
    it("returns 400 if the param of the request is malformed", () => {
      return request(app)
        .post("/api/articles/d/comments")
        .send({
          body: "this is a brand new comment",
          username: "icellusedkars"
        })
        .expect(400);
    });
  });
  describe("/api/comments/:comment_id", () => {
    it("PATCH 201 should return a status of 201 when a succesfull request occurs", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(201);
    });
    it("PATCH when passed an object containing inc_votes it increments the given article id by the given number of votes", () => {
      return request(app)
        .patch("/api/comments/4")
        .send({ inc_votes: 100 })
        .expect(201)
        .then(({ body }) => {
          const comment = body.updatedComment[0];
          expect(comment.votes).to.eql(0);
        });
    });
    it("PATCH when passed an object containing inc_votes can be used to decrease votes", () => {
      return request(app)
        .patch("/api/comments/4")
        .send({ inc_votes: -5 })
        .expect(201)
        .then(({ body }) => {
          const comment = body.updatedComment[0];
          expect(comment.votes).to.eql(-105);
        });
    });
    it("will check for invalid vote increments ", () => {
      return request(app)
        .patch("/api/comments/4")
        .send({})
        .expect(400)
        .then(({ error }) => {
          expect(error.text).to.eql(
            "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          );
        });
    });
    it("will check for malformed a param", () => {
      return request(app)
        .patch("/api/comments/d")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(({ error }) => {
          expect(error.text).to.eql(
            "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          );
        });
    });
    it("DELETE 202 will respond with a successful 202 when a comment is deleted", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(202);
    });
    it("DELETE 400 will respond with an error if a comment does not exist to be deleted", () => {
      return request(app)
        .delete("/api/comments/1000")
        .expect(400);
    });
  });
});
