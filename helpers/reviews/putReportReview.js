const axios = require('axios');
const config = require('../../config.js');
const path = require('path');

let putReportReview = (review_id) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review_id}/report`;

  const auth = {'Authorization': `${config.TOKEN}` };

  return axios.put(url, {"review_id": review_id}, { headers : auth});

}

module.exports.putReportReview = putReportReview;