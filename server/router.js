const router = require('express').Router();

const controllers = require('./controllers');

router.get('/reviews/:product_id/:sort/:count', controllers.reviews.getReviewById);
router.get('/meta/:id', controllers.reviews.getMeta);
router.post('/post/:id', controllers.reviews.postReview);
router.put('/helpfulpost/:review_id', controllers.reviews.putHelpfulReview);
router.put('/reportpost/:review_id', controllers.reviews.putReportReview);

router.get('/styles/:id', controllers.products.getStyles);
router.get('/related/:id', controllers.products.getRelated);
router.get('/allProducts', controllers.products.getAllProducts);
router.get('/:id', controllers.products.getOneProduct);

router.post('/post/:id', (req, res) => {
  res.status(200).send('making a post not set up yet');
});

router.get('/questions', (req, res) => {
  res.status(200).send('questions is not set up yet');
});

router.get('/answers', (req, res) => {
  // expected format /qa/questions/:question_id/answer
  res.status(200).send('answers is not set up yet');
});

router.post('/ask', (req, res) => {
  res.status(200).send('asking questions not set up yet');
});

router.post('/answer', (req, res) => {
  res.status(200).send('answering questions is not set up');
});

router.put('/helpfulquestion', (req, res) => {
  res.status(200).send('marking helpful not set up');
});

router.put('/reportquestion', (req, res) => {
  res.status(200).send('reporting question not set up');
});

router.put('/helpfulanswer', (req, res) => {
  res.status(200).send('helpful answer not set up');
});

router.put('/reportanswer', (req, res) => {
  res.status(200).send('report answer not set up');
});

module.exports = router;
