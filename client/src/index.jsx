import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProducts from './components/RelatedProducts.jsx';
import Questions from './components/Questions.jsx';
<<<<<<< HEAD
// import Overview from './components/Overview.jsx';
// import Ratings from './components/Ratings.jsx';
// import Modal from './components/Modal.jsx';
=======
import Overview from './components/Overview/Overview.jsx';
// import Ratings from './components/Ratings.jsx';
>>>>>>> 941d8defbbbb9b19482415c2ed37c7fd9ea85c05

function App() {
// const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState({});

  useEffect(() => {
    axios.get('/db/allProducts')
<<<<<<< HEAD
      .then((data) => { setProduct(data.data[0]); })
=======
      .then((data) => {
        setProduct(data.data[1]);
        axios.get(`/db/${data.data[0].id}`)
          .then((dat) => setProduct(dat.data))
          .catch((err) => console.log('error in index'));
      })
>>>>>>> 941d8defbbbb9b19482415c2ed37c7fd9ea85c05
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`db/meta/${product.id}`)
      .then((data) => { console.log(data.data); })
      .catch((err) => { console.log('meta did not work'); });
  }, [product]);

  return (
    <div>
<<<<<<< HEAD
      This is a placeholder being served
=======
      <nav className="nav-bar">top bar</nav>
>>>>>>> 941d8defbbbb9b19482415c2ed37c7fd9ea85c05
      <Overview product={product} rating={rating} />
      <Ratings product={product} rating={rating} />
      <RelatedProducts id={product.id} product={product} />
      <Questions product={product} />
<<<<<<< HEAD
=======
      <RelatedProducts product={product} setProduct={setProduct} />
>>>>>>> 941d8defbbbb9b19482415c2ed37c7fd9ea85c05
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
