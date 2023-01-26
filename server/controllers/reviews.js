const helpers = require('../../helpers/reviews');

module.exports = {

  getReviewById: function(req, res) {
    helpers.getReviews(req.params)
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => {
      console.log('error in getting controller reviews');
      res.status(404).send(err);
    })
  },

  getMeta: function(req, res) {
    helpers.getMeta(req.params.id)
    .then((data) => { res.status(200).send(data.data); })
    .catch((err) => {
      console.log('error in getting controller meta');
      res.status(404).send(err);
    })
  },

  postReview: function(req, res) {
    helpers.postReview(req.params.id, req.body)
    .then((data) => { res.status(201).send(data.data); })
    .catch((err) => {
      console.log('error in posting controller review');
      res.status(404).send(err);
    })
  },

  putHelpfulReview: function(req, res) {
    helpers.putHelpfulReview(req.params.review_id)
    .then((data) => {
      console.log('this is helpful');
      res.status(204).send(data.data); })
    .catch((err) => {
      console.log('error in put controller helpful');
      res.status(404).send(err);
    })
  },

  putReportReview: function(req, res) {
    helpers.putReportReview(req.params.review_id)
    .then((data) => {
      console.log('this is reporting it');
      res.status(204).send(data.data); })
    .catch((err) => {
      console.log('error in put controller report');
      res.status(404).send(err);
    })
  }

}