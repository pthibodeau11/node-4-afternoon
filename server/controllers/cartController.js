const swag = require("../models/swag");

module.exports = {
  add: (req, res) => {
    //responsible for making sure swag isn't already in cart
    const { id } = req.params;
    let { user } = req.session;

    // return -1 if it isn't in cart
    const index = user.cart.findIndex(swage => swag.id == id);

    if (index === -1) {
      const selectedSwag = swag.find(swag => swag.id == id);

      user.cart.push(selectedSwag);
      user.total += selectedSwag.price;
    }

    res.status(200).send(user);
  },

  delete: (req, res) => {
    //responsible for removing swage from cart
    const { id } = req.params;
    const { user } = req.session;

    const index = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.find(swag => swag.id == id);

    if (index !== -1) {
      //check to see if anything in cart. If it is, remove swag from cart and subtract price from total.
      user.cart.splice(index, 1);
      user.total -= selectedSwag.price;
    }

    res.status(200).send(user);
  },

  checkout: (req, res) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(user);
  }
};
