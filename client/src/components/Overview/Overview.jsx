import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';
import Price from './Price.jsx';
import Styles from './Styles.jsx';
import CartForm from './CartForm.jsx';
import Gallery from './Gallery.jsx';
import Social from './Social.jsx';

function Overview({
  product, rating, currPhotoIndex, setCurrPhotoIndex,
}) {
  const [styles, setStyles] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(0);
  const [currStyle, setCurrStyle] = useState({});
  // console.log(styles)

  useEffect(() => {
    if (product.id) {
      axios.get(`/db/styles/${product.id}`)
        .then((data) => {
          // console.log('styles',data.data.results)
          setCurrStyle(data.data.results[0]);
          setStyles(data.data.results);
        })
        .catch((err) => { console.log('there was an error', err); });
    }
  }, [product]);

  // onClick for "Read all # reviews" -> scroll to reviews
  // social media share buttons

  if (styles.length > 0) {
    return (
      <div>
        <div className="prod-content" data-testid="overview">
          <Gallery
            currStyle={currStyle}
            currPhotoIndex={currPhotoIndex}
            setCurrPhotoIndex={setCurrPhotoIndex}
          />
          <div className="prod-info">
            <Stars product={product} rating={rating} />
            <span className="category">{product.category}</span>
            <h1>{product.name}</h1>
            <Price currStyle={currStyle} />
            <Styles
              styles={styles}
              currStyle={currStyle}
              setCurrStyle={setCurrStyle}
            />
            <CartForm currStyle={currStyle} />
            <Social data-testid="social" />
          </div>
        </div>
        <div className="prod-description">
          <p className="slogan">{product.slogan}</p>
          <p>{product.description}</p>
        </div>
      </div>
    );
  }
}

export default Overview;
