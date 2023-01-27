const axios = require('axios');
const config = require('../../config.js');

const getStyle = (id) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`;

  const auth = { Authorization: `${config.TOKEN}` };

  return axios.get(url, { headers: auth });
};

exports.getStyle = getStyle;
