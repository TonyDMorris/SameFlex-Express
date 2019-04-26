process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
const app = require("../app");
const knex = require("../db/connection");
const request = require("supertest");
const endPoints = require("../controllers/api-index");

describe("/", () => {
  beforeEach(() => knex.seed.run());
  after(() => knex.destroy());

  describe("/api", () => {
    it("GET status:200 and returns an object containing keys of all the available end points and methods", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.eql(endPoints);
        });
    });
    describe("/topics", () => {
      it("GET should return a status code of 200 and an array of topic objects proceeded by a topics key", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(data => {
            const { topics } = data.body;
            expect(topics).to.be.an("array");
            expect(topics[0]).to.have.keys("slug", "description");
          });
      });
      it("POST should return a 201 and return the created topic on a topic key", () => {
        return request(app)
          .post("/api/topics")
          .send({
            slug: "dwarf fortress",
            description: "all things dwarf fortress"
          })
          .expect(201);
      });
      it("POST returned topic should have correct keys", () => {
        return request(app)
          .post("/api/topics")
          .send({
            slug: "dwarf fortress",
            description: "all things dwarf fortress"
          })
          .expect(201)
          .then(({ body }) => {
            const { topic } = body;
            expect(topic).to.eql({
              slug: "dwarf fortress",
              description: "all things dwarf fortress"
            });
          });
      });
      it("POST with a malformed body should return a 400", () => {
        return request(app)
          .post("/api/topics")
          .send({
            sug: "dwarf fortress",
            description: "all things dwarf fortress"
          })
          .expect(400);
      });
      it("PUT should return a 405 method not allowed error", () => {
        return request(app)
          .put("/api/topics")
          .expect(405)
          .then(({ body }) => {
            const { error } = body;
            expect(error).to.eql("Method Not Allowed");
          });
      });
      it("PATCH should all return a 405 method not allowed error", () => {
        return request(app)
          .patch("/api/topics")
          .expect(405)
          .then(({ body }) => {
            const { error } = body;
            expect(error).to.eql("Method Not Allowed");
          });
      });
      it("DELETE should return a 405 method not allowed error", () => {
        return request(app)
          .delete("/api/topics")
          .expect(405)
          .then(({ body }) => {
            const { error } = body;
            expect(error).to.eql("Method Not Allowed");
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
          const articles = body.articles;

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
          const articles = body.articles;
          expect(articles).to.be.descendingBy("author");
        });
    });
    it("accept a custom query to sort by ", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles).to.be.descendingBy("votes");
        });
    });
    it("accepts an optional order query for order direction of sort by", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=asc")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles).to.be.ascendingBy("votes");
        });
    });
    it("accepts an author query and returns the relevant articles", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles[0].author).to.eql("icellusedkars");
        });
    });
    it("accepts a topic query and returns the relevant articles", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles[0].topic).to.eql("mitch");
        });
    });
    it("both querys can be used together", () => {
      return request(app)
        .get("/api/articles?topic=mitch&author=rogersop")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles[0].author).to.eql("rogersop");
          expect(articles[0].topic).to.eql("mitch");
        });
    });
    it("pagination using page query", () => {
      return request(app)
        .get("/api/articles?page=1&sort_by=article_id&order=asc")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles[0].article_id).to.eql(1);
        });
    });
    it("pagination using page query", () => {
      return request(app)
        .get("/api/articles?page=2&sort_by=article_id&order=asc")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;

          expect(articles[0].article_id).to.eql(6);
        });
    });
    it("POST 201 inserts an article to the database and return the article with its allocated id", () => {
      return request(app)
        .post("/api/articles")
        .send({
          title: "title",
          body: "body",
          topic: "cats",
          username: "butter_bridge"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.article).to.be.have.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          );
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    it("when given a paramter of 1 should return an article with the given article id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const article = body.article;

          expect(article.article_id).to.eql(1);
        });
    });
    it("when given a paramter of 2 should return an article with the given article id", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          const article = body.article;

          expect(article.article_id).to.eql(2);
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    it("when given a paramter of 1 should return an article with the given article id with the votes incremented by the given amount", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 2 })
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article.votes).to.eql(2);
        });
    });
    it("PATCH when passed an object containing inc_votes it increments the given article id by the given number of votes", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 5 })
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article.votes).to.eql(5);
        });
    });

    it("PATCH when passed an object containing inc_votes it increments the given article id by the given number of votes", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: 5 })
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article.votes).to.eql(5);
        });
    });
    it("PATCH when passed an object containing inc_votes can be used to decrease votes", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({ inc_votes: -5 })
        .expect(200)
        .then(({ body }) => {
          const article = body.article;
          expect(article.votes).to.eql(-5);
        });
    });
    it("will check for invalid vote increments ", () => {
      return request(app)
        .patch("/api/articles/4")
        .send({})
        .expect(200);
    });
    it("will check for malformed a param", () => {
      return request(app)
        .patch("/api/articles/d")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(({ body }) => {
          const { error } = body;
          expect(error).to.eql(
            "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          );
        });
    });
    it("will check for invalid id", () => {
      return request(app)
        .patch("/api/articles/1000")
        .send({ inc_votes: -5 })
        .expect(404);
    });
    it("DELETE 204 will delete an article and return 204", () => {
      return request(app)
        .delete("/api/articles/1")
        .expect(204);
    });
    it("DELETE 404 returns an error if the article is not found", () => {
      return request(app)
        .delete("/api/articles/100000")
        .expect(404);
    });
  });
  describe("/api/article_id/comments", () => {
    it("GET 200 returns an array of comments for the relevant article", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments[0]).to.have.keys(
            `comment_id`,
            "votes",
            "created_at",
            "author",
            "body"
          );
          expect(body.comments[0].comment_id).to.be.an("number");
          expect(body.comments[0].votes).to.be.an("number");
          expect(body.comments[0].author).to.be.an("string");
          expect(body.comments[0].body).to.be.an("string");
          expect(body.comments[0].created_at).to.be.an("string");
        });
    });
    it("non articles should return a message and a 404 status code", () => {
      return request(app)
        .get("/api/articles/500/comments")
        .expect(404)
        .then(({ body }) => {
          const { error } = body;
          expect(error).to.eql("article not found");
        });
    });
    it("sorts by default to created at in desc order", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("created_at");
        });
    });
    it("accepts a sort_by column as a query and an order ", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=author&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.ascendingBy("author");
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
          expect(body.comment).to.have.keys(
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
    it("PATCH 200 should return a status of 200 when a succesfull request occurs", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200);
    });
    it("PATCH when passed an object containing inc_votes it increments the given article id by the given number of votes", () => {
      return request(app)
        .patch("/api/comments/4")
        .send({ inc_votes: 100 })
        .expect(200)
        .then(({ body }) => {
          const comment = body.comment;
          expect(comment.votes).to.eql(0);
        });
    });
    it("PATCH when passed an object containing inc_votes can be used to decrease votes", () => {
      return request(app)
        .patch("/api/comments/4")
        .send({ inc_votes: -5 })
        .expect(200)
        .then(({ body }) => {
          const comment = body.comment;
          expect(comment.votes).to.eql(-105);
        });
    });
    it("returns the comment if no value given with a status of 200 ", () => {
      return request(app)
        .patch("/api/comments/4")
        .send({})
        .expect(200);
    });
    it("will check for invalid id", () => {
      return request(app)
        .patch("/api/comments/1000")
        .send({ inc_votes: -5 })
        .expect(404);
    });
    it("will check for malformed a param", () => {
      return request(app)
        .patch("/api/comments/d")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(({ body }) => {
          const { error } = body;
          expect(error).to.eql(
            "The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications."
          );
        });
    });
    it("DELETE 204 will respond with a successful 204 when a comment is deleted", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
    it("DELETE 400 will respond with an error if a comment does not exist to be deleted", () => {
      return request(app)
        .delete("/api/comments/1000")
        .expect(404);
    });
  });
  describe("/api/users/:username", () => {
    it("GET should return a status of 200", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200);
    });
    it("should return the given user with the apropriate keys", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(({ body }) => {
          const { user } = body;

          expect(user).to.have.keys("username", "avatar_url", "name");
          expect(user.username).to.eql("icellusedkars");
        });
    });
    it("if the user does not exist should return 404 not found", () => {
      return request(app)
        .get("/api/users/icelluedkars")
        .expect(404)
        .then(({ body }) => {
          const { error } = body;
          expect(error).to.eql("user not found");
        });
    });
  });
  describe("/api/users", () => {
    it("POST 201 should return a 201 and the created user ", () => {
      return request(app)
        .post("/api/users")
        .send({
          avatar_url: "www.google.com",
          username: "tony",
          name: "anthony"
        })
        .expect(201);
    });
    it("POST 201 should return a 201 and the created user ", () => {
      return request(app)
        .post("/api/users")
        .send({
          avatar_url:
            "https://upload.wikimedia.org/wikipedia/commons/d/d4/Vel%C3%A1zquez_%E2%80%93_Buf%C3%B3n_don_Sebasti%C3%A1n_de_Morra_%28Museo_del_Prado%2C_c._1645%29.jpg",
          username: "tony",
          name: "anthony"
        })
        .expect(201)
        .then(({ body }) => {
          const { user } = body;
          expect(user).to.eql({
            avatar_url:
              "https://upload.wikimedia.org/wikipedia/commons/d/d4/Vel%C3%A1zquez_%E2%80%93_Buf%C3%B3n_don_Sebasti%C3%A1n_de_Morra_%28Museo_del_Prado%2C_c._1645%29.jpg",
            username: "tony",
            name: "anthony"
          });
        });
    });
    it("POST 201 defaults the avatar url if not provided in post body", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "tony",
          name: "anthony"
        })
        .expect(201)
        .then(({ body }) => {
          const { user } = body;
          expect(user).to.eql({
            avatar_url:
              "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png",
            username: "tony",
            name: "anthony"
          });
        });
    });
    it("GET 200 should return an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users).to.be.an("array");
          expect(users[0]).to.have.keys("username", "avatar_url", "name");
        });
    });
    it("accepts a limit query ", () => {
      return request(app)
        .get("/api/users?limit=2")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users).to.be.an("array");
          expect(users.length).to.eql(2);
        });
    });
  });
});
