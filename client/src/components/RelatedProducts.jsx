/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCards from './RelatedCards.jsx';
import Modal from './Modal.jsx';
// figure out how to persist collections using window.localStorage

function RelatedProducts({ id, product }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40346 : id);
  const [display, setDisplay] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  function scroll(className) {
    let copy = currentIndex;
    if (className === 'rightArrow') { copy += 1; }
    if (className === 'leftArrow') { copy -= 1; }
    setCurrentIndex(copy);
    setDisplay([copy, copy + 3 > relatedIds.length ? relatedIds.length : copy + 3]);
  }
  function clickHandler(e) {
    e.preventDefault();
    scroll(e.target.className);
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
    <div className="relatedContainer">
      { currentIndex !== 0 && !relatedIds.length <= 3 ? <input onClick={clickHandler} type="submit" className="leftArrow" value="◀" /> : null }
      {cards()}
      { currentIndex !== relatedIds.length - 3 && display[1] <= 3 ? <input onClick={clickHandler} type="submit" className="rightArrow" value="▶" /> : null }
    </div>
  );
}

export default RelatedProducts;
