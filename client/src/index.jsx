/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProducts from './components/RelatedOutfits/RelatedProducts.jsx';
import Questions from './components/Questions.jsx';
import Overview from './components/Overview.jsx';
import Ratings from './components/Ratings.jsx';
import Modal from './components/Modal.jsx';

function App() {
// const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState({});

  useEffect(() => {
    axios.get('/db/allProducts')
      .then((data) => {
        setProduct(data.data[1]);
        axios.get(`/db/${data.data[1].id}`)
          .then((dat) => setProduct(dat.data))
          .catch((err) => console.log('error in index'));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (product.id) {
      axios.get(`/db/meta/${product.id}`)
        .then((data) => { setRating(data.data); })
        .catch((err) => { console.log('meta did not work'); });
    }
  }, [product]);

  return (
    <div>
      This is a placeholder being served
      <Overview product={product} rating={rating} />
      <Ratings product={product} rating={rating} />
      <Questions product={product} />
      <RelatedProducts id={product.id} product={product} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
