require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')
const router = require('./router.js')

app.use(bodyParser())
app.use(express.json());
app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(router)













app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);