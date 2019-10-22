module.exports = function(req, res, next) {
  //creating a function to check to see if a session has been created.
  const { session } = req;
  if (!session.user) {
    //if it doesn't exist, we want to add a user object to the session
    session.user = { username: "", cart: [], total: 0 };
  }

  next();
};
