const axios = require('axios');
const config = require('../../config.js');

const putHelpfulReview = (id) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`;

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.put(url, { id }, { headers: auth });
};

module.exports.putHelpfulReview = putHelpfulReview;

// placeholder review_id: 1278299
