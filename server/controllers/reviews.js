const helpers = require('../../helpers/reviews');

module.exports = {

  getReviewById(req, res) {
    console.log('test', req.params);
    helpers.getReviews(req.params)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in getting controller reviews');
        res.status(500).send(err);
      });
  },

  getMeta(req, res) {
    helpers.getMeta(req.params.id)
      .then((data) => { res.status(200).send(data.data); })
      .catch((err) => {
        console.log('error in getting controller meta');
        res.status(500).send(err);
      });
  },

  postReview(req, res) {
    helpers.postReview(req.params.id, req.body)
      .then((data) => { res.status(201).send(data.data); })
      .catch((err) => {
        console.log('error in posting controller review');
        res.status(500).send(err);
      });
  },

  putHelpfulReview(req, res) {
    helpers.putHelpfulReview(req.params.review_id)
      .then((data) => {
        console.log('this is helpful');
        res.status(204).send(data.data);
      })
      .catch((err) => {
        console.log('error in put controller helpful');
        res.status(500).send(err);
      });
  },

  putReportReview(req, res) {
    helpers.putReportReview(req.params.review_id)
      .then((data) => {
        console.log('this is reporting it');
        res.status(204).send(data.data);
      })
      .catch((err) => {
        console.log('error in put controller report');
        res.status(500).send(err);
      });
  },

};
