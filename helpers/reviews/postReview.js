const axios = require('axios');
const config = require('../../config.js');

const postReview = (params) => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.post(url, {params:params}, { headers: auth });
};

module.exports.postReview = postReview;

/*
must include the id in the req.body as product_id
product_id: int
rating: int
summary: text
body: text
recommend: T/F
name: text
email: text
photos: [text, text]
characteristics: {????} works with an empty {}

*/
