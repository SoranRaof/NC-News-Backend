const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controller');
const { getArticles } = require('./controllers/articles-controller');
const { handleServerErrors } = require('./controllers/error-handling-controller.js')

app.use(express.json()); 

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.use('/*', (req, res) => {
    res.status(404).send({ msg: 'Not found' })
})

app.use(handleServerErrors);

module.exports = app;