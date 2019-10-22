const swag = require("../models/swag"); // <--- this is an array of swag objects

module.exports = {
  read: (req, res, next) => {
    res.status(200).json(swag);
  }
};
