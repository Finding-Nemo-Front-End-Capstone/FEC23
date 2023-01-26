const axios = require('axios');
const config = require('../../config.js');
const path = require('path');

let getReviews = (params) => { //maybe add req.params as arguments
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`;

  const auth = {'Authorization': `${config.TOKEN}` };
  return axios.get(url, { params: params, headers : auth });
  //may have to add additional parameters in the options of the axios.get
}

module.exports.getReviews = getReviews;

/*
TODO - consider how to factor in the following parameters
takes in additional parameters:
page: selects the page of the results to return, defaults to 1
count: specifies how many results per page to return, defaults to 5
sort: changes order of reviews based on "newest", "helpful", or "relevant"
product_id: specifies the product to get reviews for, is being hardcoded into this atm
*/