const endPoints = {
  availableRoutes: {
    "/api/topics": {
      GET:
        "returns an array of topics proceeded by a topics key each containing a slug and a description"
    },
    "api/articles": {
      GET:
        'responds with an array of aricle objects each containing various useful keys this endpoint accepts queries for (author,topic,sort_by,order) e.g. "/api/articles?sort_by="author"&order="desc" in addition this end point accepts a parametric endpoint for :article_id which will return an article by its id e.g. ...article/1',
      PATCH:
        "a patch to this end point accepts a body of {inc_votes:1} and a parametric endpoint of article_id, an updated article will be returned with its votes incremented by the given number "
    },
    "api/articles/:article_id/comments": {
      GET:
        "this endpoint will return an array of comment objects tied to the given article_id, e.g. ...articles/1/comments. in addition this endpoint accepts queries of sort_by and order e.g. ...articles/1/comments?sort_by=author&order=desc",
      POST:
        'a post request to this endpoint expects a request body of {username:"exampleusername",body:"example comment body"} responds with the posted comment'
    },
    "api/comments/:comment_id": {
      PATCH:
        "this end point expects a body of { inc_votes: newVote } and a comment_id parometric endpoint and then returns the comment with its votes incremented by the given amont",
      DELETE:
        "a delete request to this end point deletes the comment matching the provided comment_id and returns a status of 204 with no other content"
    },
    "api/user/:username": {
      get:
        "a get request to this endpoint simply returns an array containing the given user object based on the username given in the parometric endpoint"
    }
  }
};

module.exports = endPoints;
