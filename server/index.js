require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const getRelatedProducts = require(path.join(__dirname + '/../helpers/getRelatedProducts.js')).getRelatedProducts;
const getStyleInfo = require(path.join(__dirname + '/../helpers/getStyleInfo.js')).getStyleInfo;


app.use(express.json());
app.use(express.static(path.join(__dirname + '/../client/dist')));


app.get('/related/:id', function(req, res) {
  getRelatedProducts(req.params.id)
  .then((data) => { res.status(200).send(data.data); })
  .catch((err) => { res.status(401).send(err); })
});

app.get('/styles/:id', function(req, res) {
  getStyleInfo(req.params.id)
  .then((data) => { res.status(200).send(data.data); })
  .catch((err) => { res.status(401).send(err); })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);