/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {ClickContext} from '../../../index.jsx'

function ReviewStar({ setCountStar, countStar }) {
  // const {clicks, handleClick} = useContext(ClickContext);
  const unclick = 'fa fa-star';
  const clicked = 'fa fa-star checked';
  const [star1, setStar1] = useState(unclick);
  const [star2, setStar2] = useState(unclick);
  const [star3, setStar3] = useState(unclick);
  const [star4, setStar4] = useState(unclick);
  const [star5, setStar5] = useState(unclick);
  const [starDef, setStarDef] = useState('');

  useEffect(() => {
    if (countStar === 0) {
      setStar1(unclick);
      setStar2(unclick);
      setStar3(unclick);
      setStar4(unclick);
      setStar5(unclick);
    }
  }, [countStar]);

  useEffect(() => {
    let count = 0;
    if (star1 === 'fa fa-star checked') {
      count++;
    }
    if (star2 === 'fa fa-star checked') {
      count++;
    }
    if (star3 === 'fa fa-star checked') {
      count++;
    }
    if (star4 === 'fa fa-star checked') {
      count++;
    }
    if (star5 === 'fa fa-star checked') {
      count++;
    }
    console.log(count);
    setCountStar(count);
  }, [star1, star2, star3, star4, star5]);

  const starClick = (e) => {
    // handleClick()
    if (e.target.id === 'star5') {
      setStar5(clicked);
      setStar4(clicked);
      setStar3(clicked);
      setStar2(clicked);
      setStar1(clicked);
      setStarDef('5 stars - “Great”');
    }
    if (e.target.id === 'star4') {
      setStar5(unclick);
      setStar4(clicked);
      setStar3(clicked);
      setStar2(clicked);
      setStar1(clicked);
      setStarDef('4 stars - “Good”');
    }
    if (e.target.id === 'star3') {
      setStar5(unclick);
      setStar4(unclick);
      setStar3(clicked);
      setStar2(clicked);
      setStar1(clicked);
      setStarDef('3 stars - “Average”');
    }
    if (e.target.id === 'star2') {
      setStar5(unclick);
      setStar4(unclick);
      setStar3(unclick);
      setStar2(clicked);
      setStar1(clicked);
      setStarDef('2 stars - “Fair”');
    }
    if (e.target.id === 'star1') {
      setStar5(unclick);
      setStar4(unclick);
      setStar3(unclick);
      setStar2(unclick);
      setStar1(clicked);
      setStarDef('1 star - “Poor”');
    }
  };
  return (
    <div>
      <div className="reviewFormStarRating">
        <text>Rating: </text>
        <span id="star1" data-testid="star1" className={star1} onClick={starClick} />
        <span id="star2" data-testid="star2" className={star2} onClick={starClick} />
        <span id="star3" data-testid="star3" className={star3} onClick={starClick} />
        <span id="star4" data-testid="star4" className={star4} onClick={starClick} />
        <span id="star5" data-testid="star5" className={star5} onClick={starClick} />
        <text data-testid="starDef">{starDef}</text>
      </div>
    </div>
  );
}

export default ReviewStar;
