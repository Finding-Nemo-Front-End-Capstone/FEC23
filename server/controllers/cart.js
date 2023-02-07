const helpers = require('../../helpers/cart');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, accept, authorization',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': 10, // Seconds.
};

module.exports = {

  getCart(req, res) {
    helpers.getCart()
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in cart controller getCart');
        res.status(500).send(err);
      });
  },

  addToCart(req, res) {
    helpers.addToCart(req.body)
      .then(() => { res.status(201).send('Created'); })
      .catch((err) => {
        console.log('error in cart controller addToCart');
        res.status(500).send(err);
      });
  }
}
