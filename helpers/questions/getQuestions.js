const axios = require('axios');

const config = require('../../config.js');

module.exports = function getQuestions(query) {
  console.log('these are the query', query);
  return axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${query.product_id}&page=${query.page}&count=${query.count}`,
    method: 'GET',
    headers: {
      Authorization: config.TOKEN,
    },
  });
};
