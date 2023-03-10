const helpers = require('../../helpers/answers');

module.exports = {
  getAnswers(req, res) {
    helpers.getAnswers(req.params, req.query)
      .then((response) => { res.status(200).send(response.data); })
      .catch((err) => {
        console.log('error getting answers');
        res.status(404).send(err);
      });
  },

  addAnswers(req, res) {
    helpers.addAnswers(req.body, req.params)
      .then(() => { res.status(201).send('Created'); })
      .catch((err) => {
        console.log('there was an error adding an answer');
        res.status(404).send(err);
      });
  },

  addHelpful(req, res) {
    helpers.addHelpful(req.query)
      .then(() => { res.status(201).send('Created'); })
      .catch((err) => {
        console.log('there was an error adding an answer');
        res.status(404).send(err);
      });
  },

  addReport(req, res) {
    helpers.addReport(req.query)
      .then(() => { res.status(201).send('Created'); })
      .catch((err) => {
        console.log('there was an error adding an answer');
        res.status(404).send(err);
      });
  },

};
