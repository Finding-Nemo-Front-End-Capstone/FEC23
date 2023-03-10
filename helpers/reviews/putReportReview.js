const axios = require('axios');
const config = require('../../config.js');

const putReportReview = (id) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/report`;

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.put(url, { review_id: id }, { headers: auth });
};

module.exports.putReportReview = putReportReview;
