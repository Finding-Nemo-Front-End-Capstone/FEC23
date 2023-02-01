const axios = require('axios');
const config = require('../../config.js');

module.exports = function getAnswers(params, query) {
  return axios({
    baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${params.question_id}/answers/?page=${query.page}&count=${query.count}`,
    method: 'GET',
    headers: {
      Authorization: config.TOKEN,
    },
  });
};
