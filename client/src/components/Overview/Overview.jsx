import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';
import Price from './Price.jsx';
import Styles from './Styles.jsx';
import CartForm from './CartForm.jsx';

function Overview({ product, rating }) {

  const [styles, setStyles] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(0);
  const [currStyle, setCurrStyle] = useState({});
  console.log(styles)

  useEffect(() => {
    if (product.id) {
      axios.get(`/db/styles/${product.id}`)
      .then((data) => {
        // console.log('styles',data.data.results)
        setCurrStyle(data.data.results[0])
        setStyles(data.data.results)
      })
      .catch((err) => { console.log('there was an error', err); })
    }
  }, [product])

  // onClick for "Read all # reviews" -> scroll to reviews
  // social media share buttons

  if (styles.length > 0) {
    return (
      <div className="prod-content">
        <div className="prod-info">
          <h1 className="heading">{product.name}</h1>
          <Price currStyle={currStyle}/>
          <Stars product={product} rating={rating}/>
          <Styles styles={styles} currStyle={currStyle} setCurrStyle={setCurrStyle}/>
          <CartForm currStyle={currStyle}/>
        </div>
          <img className="main-photo" src={currStyle.photos[0].url}/>
              {/* <p>{product.description}</p> */}
          <div className="gallery">
            {currStyle.photos.map((photo, i) => {
              return <img className="gallery-photos"
              src={photo.thumbnail_url} key={photo.url} index={i}
              />
            })}
          </div>
      </div>
    )
  }





}

export default Overview;




  // const avgRating = (ratingsObj) => {
  //   let reviewCount = 0;
  //   let total = 0;
  //   if (ratingsObj) {
  //     for (let stars in ratingsObj) {
  //       reviewCount += Number(ratingsObj[stars]);
  //       total += (stars * ratingsObj[stars]);
  //     }
  //   }
  //   return (Math.round(total / reviewCount * 4) / 4).toFixed(2);
  // }