const axios = require('axios');
const path = require('path');
const config = require('../../config.js');

const getRelated = (id) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`;

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.get(url, { headers: auth });
};

module.exports.getRelated = getRelated;
