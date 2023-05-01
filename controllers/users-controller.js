const app = require("../app");
const { fetchUsers } = require("../models/model");

const getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUsers };
