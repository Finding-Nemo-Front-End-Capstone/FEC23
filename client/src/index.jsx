import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import RelatedProducts from './components/RelatedProducts.jsx'
import Questions from './components/Questions.jsx';
// import Overview from './components/Overview.jsx';
import Ratings from './components/Ratings.jsx';
import axios from 'axios'

const App = () => {
// const [productList, setProductList] = useState([]);
const [product, setProduct] = useState([]);

// useEffect(() => {
//   axios.get('/products')
//     .then((data) => {setProduct(data.data[0])})
//     .catch(() => console.log('err in fetching product List'))
// }, [])



  return (
    <div>
      This is a placeholder being served
      {/* <Overview product={product}/> */}
      <Ratings product={product}/>
      <Questions product={product}/>
      <RelatedProducts product={product} setProduct={setProduct}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
