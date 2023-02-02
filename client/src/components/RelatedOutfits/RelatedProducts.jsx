/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCards from './RelatedCards.jsx';
import Outfits from './Outfits.jsx';

function RelatedProducts({ id, product, ratings, currStyle }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40345 : id);
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
  useEffect(() => {
    axios.get(`/db/related/${currentId}`)
      .then((data) => {
        setRelatedIds(data.data);
        if (data.data.length > 4) {
          setDisplay([0, 4]);
        } else {
          setDisplay([0, data.data.length]);
        }
      })
      .catch((err) => { console.log('there was an error', err); });
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]));
    }
  }, [currentId]);
  function cards() {
    return (
      relatedIds.slice(display[0], display[1]).map((singleId) => (
        <div className="relatedCard">
          <RelatedCards id={singleId} product={product} setCurrentId={setCurrentId} />
        </div>
      ))
    );
  }
  return (
    <div className="RelatedOutfits">
      <h7 className="relatedProductsHeader">RELATED PRODUCTS</h7>
      { currentIndex !== 0 && !relatedIds.length <= 3 ? <input onClick={arrowHandler} type="submit" className="leftArrow" value="◀" /> : null }
      <div className="relatedContainer">
        {cards()}
      </div>
      { currentIndex !== relatedIds.length - 3 && display[1] <= 4 ? <input onClick={arrowHandler} type="submit" className="rightArrow" value="▶" /> : null }
      <br />
      <h7 className="outfitsHeader">YOUR OUTFIT</h7>
      <Outfits product={product} ratings={ratings} currStyle={currStyle}/>
    </div>
  );
}

export default RelatedProducts;
