const axios = require('axios');
const config = require('../config.js');
const path = require('path');

let getStyleInfo = (id) => {
  const url = 'https://app-hrsei-app.herokuapp.com/api/fec2/hr-rfp/products/' + id + '/styles';

  const auth = { 'Authorization': `${config.TOKEN}` }

  return axios.get(url, {headers: auth});
}

module.exports.getStyleInfo = getStyleInfo;