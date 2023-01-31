const helpers = require('../../helpers');

module.exports = {

  getReviewById(req, res) {
    helpers.getReviews(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in getting controller reviews');
        res.status(500).send(err);
      });
  },

};
