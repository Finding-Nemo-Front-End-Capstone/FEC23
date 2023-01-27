/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCards from './RelatedCards.jsx';
// figure out how to persist collections using window.localStorage
// render based on range and set up the display
function RelatedProducts({ id }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40346 : id);
  const [display, setDisplay] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [render, setRender] = useState(0);
  function carouselScroll(className) {
    let copy = currentIndex;
    if (className === 'rightArrow') {
      copy += 1;
    } else if (className === 'leftArrow') {
      copy -= 1;
    }
    setCurrentIndex(copy);
    setDisplay([copy, copy + 3 > relatedIds.length ? relatedIds.length : copy + 3]);
  }
  function clickHandler(e) {
    e.preventDefault();
    carouselScroll(e.target.className);
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
  }, []);

  function cards() {
    return (
      relatedIds.slice(display[0], display[1]).map((singleId) => (
        <div className="relatedCard">
          <RelatedCards id={singleId} display={display} setDisplay={setDisplay} />
        </div>
      ))
    );
  }
  return (
    <div className="relatedContainer">
      { currentIndex !== 0 ? <input onClick={clickHandler} type="submit" className="leftArrow" value="◀" /> : null }
      {cards()}
      { currentIndex !== relatedIds.length - 3 ? <input onClick={clickHandler} type="submit" className="rightArrow" value="▶" /> : null }
    </div>
  );
}

export default RelatedProducts;
