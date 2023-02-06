/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProducts from './components/RelatedOutfits/RelatedProducts.jsx';
import Questions from './components/Questions.jsx';
import Overview from './components/Overview/Overview.jsx';
import Ratings from './components/Ratings.jsx';

function App() {
// const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const [prodInfo, setProdInfo] = useState({});
  const [rating, setRating] = useState({});
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0);
  const [style, setStyle] = useState([]);

  useEffect(() => {
    axios.get('/db/allProducts')
      .then((data) => {
        setProduct(data.data[2]);
        axios.get(`/db/${data.data[2].id}`)
          .then((info) => setProdInfo(info.data))
          .catch(() => console.log('product info did not work'))
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (product.id) {
      axios.get(`db/meta/${product.id}`)
        .then((data) => { setRating(data.data); })
        .catch((err) => { console.log('meta did not work'); });
      axios.get(`db/styles/${product.id}`)
        .then((data) => {setStyle(data.data); })
        .catch((err) => { console.log('styles did not work'); });
    }
  }, [product]);

  return (
    <div>
      <nav className="nav-bar">top bar</nav>
      <Overview product={product} rating={rating}
      currPhotoIndex={currPhotoIndex} setCurrPhotoIndex={setCurrPhotoIndex}/>
      {/* <Ratings product={product} rating={rating} setProduct={setProduct} /> */}
      {/* <Questions product={product} /> */}
      {/* <RelatedProducts id={product.id} product={prodInfo} rating={rating} currStyle={style}/> */}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.createRoot()
