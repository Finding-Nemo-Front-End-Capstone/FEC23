import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RelatedProducts from './components/RelatedOutfits/RelatedProducts.jsx';
import Questions from './components/Questions.jsx';
import Overview from './components/Overview/Overview.jsx';
import Ratings from './components/Ratings.jsx';
// import withClickTracking from './ClickTracker.jsx'

export const ClickContext = createContext();

// withClickTracking (
  function App() {
    // const [productList, setProductList] = useState([]);
      const [product, setProduct] = useState({});
      const [prodInfo, setProdInfo] = useState({});
      const [rating, setRating] = useState({});
      const [currPhotoIndex, setCurrPhotoIndex] = useState(0);
      const [style, setStyle] = useState([]);
      const [invoke, setInvoke] = useState(true);

      const [clicks, setClicks] = useState([]);


      const handleClick = (e) => {
        console.log("THIS IS THE TARGET", e.target);
        console.log(clicks)
        setClicks([...clicks, { element: e.target, time: Date.now(), module }]);
      };

      useEffect(() => {
        axios.get('/db/allProducts')
          .then((data) => {
            setProduct(data.data[2]);
            axios.get(`/db/${data.data[2].id}`)
              .then((info) => setProdInfo(info.data))
              .catch(() => console.log('product info did not work'));
          })
          .catch((err) => console.log(err));
      }, []);

  useEffect(() => {
    if (product.id) {
      setProdInfo(product);
      axios.get(`db/meta/${product.id}`)
        .then((data) => { setRating(data.data); })
        .catch((err) => { console.log('meta did not work'); });
      axios.get(`db/styles/${product.id}`)
        .then((data) => { setStyle(data.data); })
        .catch((err) => { console.log('styles did not work'); });
    }
  }, [product, invoke]);

      return (
        <div onClick={handleClick} >
          <nav className="nav-bar">Nemos</nav>
          <Overview
            product={product}
            rating={rating}
            currPhotoIndex={currPhotoIndex}
            setCurrPhotoIndex={setCurrPhotoIndex}
          />
          <Questions product={product} />
          <RelatedProducts id={product.id} product={prodInfo} setProduct={setProduct} rating={rating} currStyle={style} />
          <Ratings product={product} rating={rating} setProduct={setProduct} invoke={invoke} setInvoke={setInvoke} />
          <br />
        </div>
      );
    }
ReactDOM.render(<App />, document.getElementById('app'));
