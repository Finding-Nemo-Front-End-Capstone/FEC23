/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewInput from './ReviewFormComp/ReviewInput.jsx';
import ReviewStar from './ReviewFormComp/ReviewStar.jsx';
import Characteristic from './ReviewFormComp/Characteristic.jsx';
import Summary from './ReviewFormComp/Summary.jsx';
import Body from './ReviewFormComp/Body.jsx';
import ReviewPhoto from './ReviewFormComp/ReviewPhoto.jsx';

function ReviewForm(props) {
  const [countStar, setCountStar] = useState(0);
  const [recommendStatus, setRecommendStatus] = useState(false);
  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [length, setLength] = useState('');
  const [fit, setFit] = useState('');
  const [sizeStatus, setSizeStatus] = useState('');
  const [widthStatus, setWidthSatus] = useState('');
  const [comfortStatus, setComfortStatus] = useState('');
  const [qualityStatus, setQualityStatus] = useState('');
  const [lengthStatus, setLengthStatus] = useState('');
  const [fitStatus, setFitStatus] = useState('');
  const [summaryValue, setSummaryValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [imageList, setImageList] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const click = {
    clickSize: (e) => {
      const explain = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
      const value = Number(e.target.value);
      setSize(value);
      setSizeStatus(explain[value - 1]);
    },
    clickWidth: (e) => {
      const explain = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
      const value = Number(e.target.value);
      setWidth(value);
      setWidthSatus(explain[value - 1]);
    },
    clickComfort: (e) => {
      const explain = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
      const value = Number(e.target.value);
      setComfort(value);
      setComfortStatus(explain[value - 1]);
    },
    clickQuality: (e) => {
      const explain = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
      const value = Number(e.target.value);
      setQuality(value);
      setQualityStatus(explain[value - 1]);
    },
    clickLength: (e) => {
      const explain = ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
      const value = Number(e.target.value);
      setLength(value);
      setLengthStatus(explain[value - 1]);
    },
    clickFit: (e) => {
      const explain = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
      const value = Number(e.target.value);
      setFit(value);
      setFitStatus(explain[value - 1]);
    },
  };

  const status = {
    sizeStatus,
    widthStatus,
    comfortStatus,
    qualityStatus,
    lengthStatus,
    fitStatus,
  };

  const nicknameChange = (e) => {
    if (e.target.value.length <= 60) {
      setNickname(e.target.value);
    }
  };

  const emailChange = (e) => {
    if (e.target.value.length <= 60) {
      setEmail(e.target.value);
    }
  };

  const submitForm = {

  };

  return (
    <div>
      ReviewForm
      <br />
      <br />
      <label htmlFor="nickname">
        Nickname:
        <input type="text" className="nickname" value={nickname} />
      </label>
      <label htmlFor="email">
        email:
        <input type="email" className="email" value={email} />
      </label>
      <br />
      <br />
      <div className="reviewFormStarRating">
        <ReviewStar setCountStar={setCountStar} />
      </div>
      <br />
      <div className="reviewInput">
        <ReviewInput setRecommendStatus={setRecommendStatus} recommendStatus={recommendStatus} />
      </div>
      <br />
      <div className="characteristic">
        <Characteristic click={click} status={status} />
      </div>
      <br />
      <div className="summary">
        <Summary summaryValue={summaryValue} setSummaryValue={setSummaryValue} />
      </div>
      <br />
      <div className="body">
        <Body bodyValue={bodyValue} setBodyValue={setBodyValue} />
      </div>
      <br />
      <div className="reviewPhotos">
        <ReviewPhoto imageList={imageList} setImageList={setImageList} />
      </div>
      <br />
      <button className="submitReviewForm">Submit Review</button>
      {/* Mandatory: rating, characteristic, body, nickname, email */}
    </div>
  );
}

export default ReviewForm;