const express = require("express");
const axios = require('axios');
const router = express.Router();
const config = require('../config.js');

router.get('/products', (req, res) => {
  axios({
    method:'GET',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: {
      AUTHORIZATION: config.TOKEN
    }
  })
    .then ((data) =>{
    res.status(200);
    res.json(data.data)
  })
    .catch(() => {
      res.status(500);
      res.end()
    })
})



module.exports=router