const axios = require('axios');

const config = require('../../config.js');

const getAllProducts = () => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products';

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.get(url, { headers: auth });
};

module.exports.getAllProducts = getAllProducts;
