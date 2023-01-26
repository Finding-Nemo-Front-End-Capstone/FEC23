const helpers = require('../../helpers/products');

module.exports = {

  getAllProducts(req, res) {
    helpers.getAllProducts()
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller getAll');
        res.status(404).send(err);
      });
  },

  getOneProduct(req, res) {
    helpers.getOne(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller getOne');
        res.status(404).send(err);
      });
  },

  getStyles(req, res) {
    helpers.getStyleInfo(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller styles');
        res.status(404).send(err);
      });
  },

  getRelated(req, res) {
    helpers.getRelated(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in prod controller related');
        res.status(404).send(err);
      });
  },
};
