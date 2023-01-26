const helpers = require('../../helpers/products');
module.exports = {

  getAllProducts: function (req, res) {
    helpers.getAllProducts()
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => {
      console.log('error in prod controller getAll');
      res.status(404).send(err);
    })
  },

  getOneProduct: function (req, res) {
    helpers.getOne(req.params.id)
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => {
      console.log('error in prod controller getOne');
      res.status(404).send(err);
    })
  },

  getStyles: function(req, res) {
    helpers.getStyle(req.params.id)
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => {
      console.log('error in prod controller styles');
      res.status(404).send(err);
    })
  },

  getRelated: function(req, res) {
    helpers.getRelated(req.params.id)
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => {
      console.log('error in prod controller related');
      res.status(404).send(err);
    });
  }
};