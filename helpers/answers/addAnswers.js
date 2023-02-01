const axios = require('axios');
const config = require('../../config.js');

module.exports = (reqBody, params) => axios({
  method: 'post',
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${params.question_id}/answers`,
  headers: {
    Authorization: config.TOKEN,
  },
  data: reqBody,
});
