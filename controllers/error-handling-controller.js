const app = require('../app');


const handleServerErrors = (err, req, res, next) => {
    console.log(err)
        res.status(500).send({ msg: 'Internal server error' })
}

const handleCustomErrors = (err, req, res, next) => {
    console.log(err)
    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    }
    else {
        next(err)
    }
}

const handlePSQLErrors = (err, req, res, next) => {
    console.log(err)
    if (err.code === '22P02' || err.code === '23502') {
        res.status(400).send({ msg: 'Bad request' })
    }
    else {
        next(err)
    }
}

module.exports = { handleServerErrors, handleCustomErrors, handlePSQLErrors };