const app = require('../app');
const { fetchTopics } = require('../models/model.js');
const { handleServerErrors, handleCustomErrors, handlePSQLErrors } = require('./error-handling-controller')

const getTopics = (req, res, next) => {
    return fetchTopics()
    .then(topics => {
        res.status(200).send({topics})
    })
    .catch(next)
}

module.exports = { getTopics };