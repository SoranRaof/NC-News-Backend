const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controller.js');
const { getArticles, getArticleById, getCommentsByArticleId, postCommentByArticleId } = require('./controllers/articles-controller');
// const { postCommentsByArticleId } = require('./controllers/comment-controller');
const { handleServerErrors, handleCustomErrors, handlePSQLErrors } = require('./controllers/error-handling-controller.js')

app.use(express.json()); 

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.use('*', (req, res) => {
    res.status(404).send({ msg: 'Not found' })
})

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app;