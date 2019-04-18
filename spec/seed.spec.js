const knex = require("../db/connection");
const { expect } = require("chai");

describe("should seed all tables correctly  ", () => {
  after(() => {
    knex.destroy();
  });
  describe("should seed the topics table correctly", () => {
    it("should should seed the tables columns with the correct column names", () => {
      return knex("topics")
        .select("*")
        .first()
        .then(topic => {
          expect(topic).to.have.keys("slug", `description`);
        });
    });
  });
  describe("should seed the users correctly", () => {
    it("should should seed the tables columns with the correct column names", () => {
      return knex("users")
        .select("*")
        .first()
        .then(topic => {
          expect(topic).to.have.keys("username", `avatar_url`, "name");
        });
    });
  });
  describe("should seed the articles correctly", () => {
    it("should should seed the tables columns with the correct column names", () => {
      return knex("articles")
        .select("*")
        .where("topic", "cats")
        .first()
        .then(article => {
          expect(article).to.have.keys(
            `article_id`,
            `title`,
            `body`,
            `votes`,
            `topic`,
            `author`,
            `created_at`
          );
          console.log(article);
          expect(article.votes).to.equal(0);
        });
    });
  });
  describe("should seed the comments correctly", () => {
    it("should seed the tables columns with the correct column names", () => {
      return knex("comments")
        .select("*")
        .first()
        .then(comment => {
          expect(comment).to.have.keys(
            `comment_id`,
            `author`,
            `article_id`,
            `votes`,
            `created_at`,
            `body`
          );
          console.log(article);
          expect(article.votes).to.equal(0);
        });
    });
  });
});
