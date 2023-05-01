const cors = require("cors");
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controller.js");
const { getUsers } = require("./controllers/users-controller.js");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles-controller");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  patchCommentByArticleId,
  deleteCommentByCommentId,
} = require("./controllers/comments-controller.js");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./controllers/error-handling-controller.js");

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchCommentByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
