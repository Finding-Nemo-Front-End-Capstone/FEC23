const axios = require('axios');
const config = require('../../config.js');

module.exports = (query) => axios({
  method: 'put',
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${query.question_id}/report`,
  headers: {
    Authorization: config.TOKEN,
  },
});