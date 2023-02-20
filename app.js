const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controller');
//const { handleServerErrors } = require('./controllers/error-handling-controllers')

app.use(express.json()); // <------this allows our app to parse JSON 

app.get('/api/topics', getTopics)
//app.use(handleServerErrors)

module.exports = app;