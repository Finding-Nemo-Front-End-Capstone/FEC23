import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProducts from './components/RelatedProducts.jsx';
import Questions from './components/Questions.jsx';
import Overview from './components/Overview.jsx';
import Ratings from './components/Ratings.jsx';

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
      axios.get(`db/meta/${product.id}`)
        .then((data) => { setRating(data.data); })
        .catch((err) => { console.log('meta did not work'); });
    }
  }, [product]);

  return (
    <div>
      This is a placeholder being served
      {/* <Overview product={product} rating={rating} /> */}
      <Ratings product={product} rating={rating} setProduct={setProduct} />
      {/* <Questions product={product} /> */}
      {/* <RelatedProducts product={product} setProduct={setProduct} /> */}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
