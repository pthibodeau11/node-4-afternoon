const users = require("../models/users"); // this is where the users are kept after registering

let id = 1;

module.exports = {
  register: (req, res) => {
    //method will look for a username and password on request body and then create a user object
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password }); //push new user object to array
    id++;

    session.user.username = username; //set the value of username on the request session's user object to the value of username from the request body.
    res.status(200).send(session.user);
  },

  login: (req, res) => {
    const { session } = req;
    const { username, password } = req.body; //use username and password from the request body to find a user object in the users array with the same user/pass combination.

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      // If it finds a user with that combination, it should update the value of username on the request session's user object to value of username from the request body
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
  },

  signout: (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: (req, res) => {
    const { session } = req;
    res.status(200).send(session.user);
  }
};
