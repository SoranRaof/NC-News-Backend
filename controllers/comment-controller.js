// const app = require('../app');
// const { fetchArticles, fetchArticleById, fetchCommentsByArticleId, insertCommentByArticleId } = require('../models/model.js');

// const postCommentsByArticleId = (req, res, next) => {
//     const { article_id } = req.params;
//     const { username, body } = req.body;
//     Promise.all([fetchArticleById(article_id)])
//     .then(() => {
//         return insertCommentByArticleId(article_id, username, body)
//     })
//     .then((result) => {
//         res.status(201).send({ postedComment: result })
//     })
//     .catch((err) => 
//         next(err))
//     }

// module.exports = { postCommentsByArticleId };
