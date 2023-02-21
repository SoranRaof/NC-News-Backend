const app = require('../app');
const { fetchTopics } = require('../models/model.js');
const { handleServerErrors } = require('./error-handling-controller')

const getTopics = (req, res, next) => {
    return fetchTopics()
    .then(topics => {
        res.status(200).send({topics})
    })
    // .catch(err => {
    //     handleServerErrors(err, req, res, next)
    // })
}

module.exports = { getTopics };