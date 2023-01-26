const axios = require('axios');
const config = require('../../config.js');
const path = require('path');

let getMeta = (id) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`;

  const auth = {'Authorization': `${config.TOKEN}` };

  return axios.get(url, { headers : auth});
}

module.exports.getMeta = getMeta;