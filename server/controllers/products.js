const helpers = require('../../helpers/products');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, accept, authorization',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': 10, // Seconds.
};

module.exports = {

  getAllProducts(req, res) {
    helpers.getAllProducts()
      .then((data) => { res.header(headers); res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller getAll');
        res.status(500).send(err);
      });
  },

  getOneProduct(req, res) {
    helpers.getOne(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller getOne');
        res.status(500).send(err);
      });
  },

  getStyles(req, res) {
    helpers.getStyle(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller styles');
        res.status(500).send(err);
      });
  },

  getRelated(req, res) {
    helpers.getRelated(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller related');
        res.status(500).send(err);
      });
  },
};
