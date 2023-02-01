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
// Q&A:
router.get('/questions/:id', controllers.questions.getQuestions);
router.get('/answers/:question_id', controllers.answers.getAnswers);
router.post('/question', controllers.questions.addQuestion);
router.post('/answers/:question_id', controllers.answers.addAnswers);
router.put('/helpfulquestion', controllers.questions.addHelpful);
router.put('/helpfulanswer', controllers.answers.addHelpful);
router.put('/reportquestion/:question_id', controllers.questions.addReport);
router.put('/reportanswer', controllers.answers.addReport);

module.exports = router;
