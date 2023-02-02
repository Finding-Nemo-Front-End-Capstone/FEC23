/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCards from './RelatedCards.jsx';
import Modal from './Modal.jsx';
import Outfits from './Outfits.jsx';
// figure out how to persist collections using window.localStorage

function RelatedProducts({ id, product, ratings }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40345 : id);
  const [display, setDisplay] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storage, setStorage] = useState({});
  const [currStyle, setCurrStyle] = useState({});
  function clickHandler(e) {
    e.preventDefault();
    let copy = currentIndex;
    if (e.target.className === 'rightArrow') { copy += 1; }
    if (e.target.className === 'leftArrow') { copy -= 1; }
    setCurrentIndex(copy);
    setDisplay([copy, copy + 3 > relatedIds.length
      ? relatedIds.length
      : copy + 3]);
  }
  useEffect(() => {
    axios.get(`/db/related/${currentId}`)
      .then((data) => {
        setRelatedIds(data.data);
        if (data.data.length > 3) {
          setDisplay([0, 3]);
        } else {
          setDisplay([0, data.data.length]);
        }
      })
      .catch((err) => { console.log('there was an error', err); });
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]));
    }
    axios.get(`/db/styles/${currentId}`)
      .then((data) => { setCurrStyle(data.data); })
      .catch((err) => { console.log('there was an error'); });
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
      <div className="relatedContainer">
        { currentIndex !== 0 && !relatedIds.length <= 3 ? <input onClick={clickHandler} type="submit" className="leftArrow" value="◀" /> : null }
        {cards()}
        { currentIndex !== relatedIds.length - 3 && display[1] <= 3 ? <input onClick={clickHandler} type="submit" className="rightArrow" value="▶" /> : null }
      </div>
      <br />
      <h7 className="outfitsHeader">YOUR OUTFIT</h7>
      <Outfits product={product} ratings={ratings}/>
    </div>
  );
}

export default RelatedProducts;
