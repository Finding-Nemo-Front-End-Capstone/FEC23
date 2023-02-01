/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProducts from './components/RelatedProducts.jsx';
import Questions from './components/Questions.jsx';
import Overview from './components/Overview.jsx';
// import Ratings from './components/Ratings.jsx';
// import css from '../../client/dist/style.css';

function App() {
// const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState({});

  useEffect(() => {
    axios.get('/db/allProducts')
      .then((data) => { setProduct(data.data[0]); })
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
    <>
      <nav className="nav-bar">Finding Nemo</nav>
      <div>
        <p className="site-announcement">SITE-WIDE ANNOUNCEMENT MESSAGE!</p>
        <Overview product={product} rating={rating} />
        {/* <Ratings product={product} rating={rating} /> */}
        <Questions product={product} />
        {/* <RelatedProducts product={product} setProduct={setProduct} /> */}
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
//
