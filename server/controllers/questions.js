const helpers = require('../../helpers/questions');

module.exports = {

  getQuestions(req, res) {
    helpers.getQuestions(req.params, req.query)
      .then((response) => { res.status(200).send(response.data); })
      .catch((err) => {
        console.log('error in getting questions');
        res.status(404).send(err);
      });
  },

  addQuestion(req, res) {
    console.log(req.body);
    helpers.addQuestion(req.body)
      .then(() => { res.status(201).send('Created'); })
      .catch((err) => {
        console.log('error adding question');
        res.status(404).send(err);
      });
  },

  addHelpful(req, res) {
    helpers.addHelpful(req.query)
      .then(() => { res.status(204).send('Created'); })
      .catch((err) => {
        console.log('error marking helpful');
        res.status(404).send(err);
      });
  },

  addReport(req, res) {
    helpers.addReport(req.query)
      .then(() => { res.status(204).send('Created'); })
      .catch((err) => {
        console.log('error marking helpful');
        res.status(404).send(err);
      });
  },

};
