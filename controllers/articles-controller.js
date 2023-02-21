const app = require('../app');
const { fetchArticles } = require('../models/model.js');
const { handleServerErrors } = require('./error-handling-controller')

const getArticles = (req, res, next) => {
    const { sort_by, order } = req.query;
    fetchArticles(sort_by, order)
    .then(articles => {
        res.status(200).send({ articles })
    })
    .catch(next)
}

module.exports = { getArticles };