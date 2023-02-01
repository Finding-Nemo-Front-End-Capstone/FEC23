const axios = require('axios');

const config = require('../../config.js');

module.exports = function getQuestions(params, query) {
  return axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    method: 'GET',
    headers: {
      Authorization: config.TOKEN,
    },
    params: { ...query, product_id: params.id },
  });
};
