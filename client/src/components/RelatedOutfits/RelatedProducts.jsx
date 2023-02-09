/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCards from './RelatedCards.jsx';
import Outfits from './Outfits.jsx';

function RelatedProducts({ id, product, setProduct, rating, currStyle }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [display, setDisplay] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  function arrowHandler(e) {
    e.preventDefault();
    let copy = currentIndex;
    if (e.target.className === 'rightArrow') { copy += 1; }
    if (e.target.className === 'leftArrow') { copy -= 1; }
    setCurrentIndex(copy);
    setDisplay([copy, copy + 4 > relatedIds.length
      ? relatedIds.length
      : copy + 4]);
  }
  async function getInfo(relId) {
    const endpoints = [
      `db/styles/${relId}`,
      `db/${relId}`,
      `db/meta/${relId}`
    ];
    const obj = await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread((styles, prod, ratings) => {
          const res = {};
          res.id = prod.data.id;
          res.category = prod.data.category;
          res.name = prod.data.name;
          res.price = prod.data.default_price;
          res.features = prod.data.features;
          res.rating = ratings.data;
          res.thumbnail = styles.data.results[0].photos[0].thumbnail_url;
          return res;
        })
      )
      .then((res) => (res));
    return obj;
  }
  useEffect(() => {
    if (id) {
      axios.get(`/db/related/${id}`)
        .then(async (data) => {
          setRelatedIds(await Promise.all(data.data.map((singleId) => getInfo(singleId))));
          if (data.data.length > 4) { setDisplay([0, 4]); } else { setDisplay([0, data.data.length]); }
        })
        .catch(() => console.log('error with get all'));
      if (!localStorage.getItem('outfits')) {
        localStorage.setItem('outfits', JSON.stringify([]));
      }
    }
  }, [id]);
  function cards() {
    return (
      relatedIds.slice(display[0], display[1]).map((targetInfo) => (
        <div className="relatedCard">
          <RelatedCards relInfo={targetInfo} product={product} setProduct={setProduct} display={display} />
        </div>
      ))
    );
  }

  return (
    <div className="RelatedOutfits">
      <h4 className="relatedProductsHeader">RELATED PRODUCTS</h4>
      { currentIndex !== 0 && !relatedIds.length <= 3 ? <button onClick={arrowHandler} type="button" className="leftArrow">◀</button> : null }
      <div className="relatedContainer">
        {cards()}
      </div>
      { currentIndex !== relatedIds.length - 3 && display[1] <= 4 ? <button onClick={arrowHandler} type="button" className="rightArrow">▶</button> : null }
      <br />
      <h4 className="outfitsHeader">YOUR OUTFIT</h4>
      <Outfits product={product} rating={rating} currStyle={currStyle} />
    </div>
  );
}

export default RelatedProducts;
