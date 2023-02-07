const axios = require('axios');
const path = require('path');
const config = require('../../config.js');

const getCart = () => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`;

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.get(url, { headers: auth });
};

module.exports.getCart = getCart;