const app = require("../app");
const {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleVotes,
  deleteComment,
} = require("../models/model.js");

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  return deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => next(err));
};

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  patchCommentByArticleId,
  deleteCommentByCommentId,
};
