const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controller');
const { getArticles, getArticleById, getCommentsByArticleId } = require('./controllers/articles-controller');
const { handleServerErrors, handleCustomErrors, handlePSQLErrors } = require('./controllers/error-handling-controller.js')

app.use(express.json()); 

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.use('*', (req, res) => {
    res.status(404).send({ msg: 'Not found' })
})

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app;