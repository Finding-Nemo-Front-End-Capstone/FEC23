const axios = require('axios');
const config = require('../../config.js');

module.exports = (reqBody) => axios({
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
  method: 'POST',
  headers: {
    Authorization: config.TOKEN,
  },
  data: reqBody,
});
