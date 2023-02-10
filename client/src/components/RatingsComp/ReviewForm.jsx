/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReviewInput from './ReviewFormComp/ReviewInput.jsx';
import ReviewStar from './ReviewFormComp/ReviewStar.jsx';
import Characteristic from './ReviewFormComp/Characteristic.jsx';
import Summary from './ReviewFormComp/Summary.jsx';
import Body from './ReviewFormComp/Body.jsx';
import ReviewPhoto from './ReviewFormComp/ReviewPhoto.jsx';
// import {ClickContext} from '../../index.jsx'

function ReviewForm({
  rating, setReviewForm, totalReview, setTotalReviews, setSort, invoke, setInvoke,
}) {
  // const {clicks, handleClick} = useContext(ClickContext);
  const [countStar, setCountStar] = useState(0);
  const [recommendStatus, setRecommendStatus] = useState(false);
  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [length, setLength] = useState('');
  const [fit, setFit] = useState('');
  const [sizeStatus, setSizeStatus] = useState('');
  const [widthStatus, setWidthStatus] = useState('');
  const [comfortStatus, setComfortStatus] = useState('');
  const [qualityStatus, setQualityStatus] = useState('');
  const [lengthStatus, setLengthStatus] = useState('');
  const [fitStatus, setFitStatus] = useState('');
  const [summaryValue, setSummaryValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [imageList, setImageList] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [submitWarning, setSubmitWarning] = useState('none');
  const [characteristicList, setCharacteristicList] = useState([]);
  const [idChacList, setIdChacList] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

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
      setWidthStatus(explain[value - 1]);
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

  const submitForm = (e) => {
    // handleClick()
    const uncomplete = () => {
      setSubmitWarning('');
    };
    const params = {};
    const cList = characteristicList;
    const iList = idChacList;
    for (let i = 0; i < cList.length; i++) {
      if (cList[i] === 'Size') {
        if (size === '') {
          return uncomplete();
        }
        cList[i] = size;
      }
      if (cList[i] === 'Width') {
        if (width === '') {
          return uncomplete();
        }
        cList[i] = width;
      }
      if (cList[i] === 'Comfort') {
        if (comfort === '') {
          return uncomplete();
        }
        cList[i] = comfort;
      }
      if (cList[i] === 'Quality') {
        if (quality === '') {
          return uncomplete();
        }
        cList[i] = quality;
      }
      if (cList[i] === 'Length') {
        if (length === '') {
          return uncomplete();
        }
        cList[i] = length;
      }
      if (cList[i] === 'Fit') {
        if (fit === '') {
          return uncomplete();
        }
        cList[i] = fit;
      }
    }
    if (bodyValue.length < 50 || nickname === ''
    || email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1
     || countStar === 0) {
      return uncomplete();
    }
    if (email.indexOf('@') !== -1) {
      const emailcheck = email.slice(email.indexOf('@'));
      if (emailcheck.indexOf('.') === -1) {
        return uncomplete();
      }
      const emailCheck2 = emailcheck.slice(emailcheck.indexOf('.'));
      if (emailCheck2.length === 1) {
        return uncomplete();
      }
    }
    if (email.indexOf('@') === 0) {
      return uncomplete();
    }

    setSubmitWarning('none');
    params.characteristics = {};
    for (let i = 0; i < cList.length; i++) {
      params.characteristics[iList[i]] = cList[i];
    }
    params.product_id = Number(rating.product_id);
    params.rating = countStar;
    params.summary = summaryValue;
    params.body = bodyValue;
    params.recommend = recommendStatus;
    params.name = nickname;
    params.email = email;
    params.photos = [];
    // console.log(params);

    Promise.all(imageFiles.map((eachFile) => {
      const formData = new FormData();
      formData.append('file', eachFile);
      formData.append('upload_preset', 'o9exuyqa');
      // console.log(imageFiles)
      return axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
        .then((res) => {
          console.log('IneedTHIIIIIS', res.data.secure_url);
          params.photos.push(res.data.secure_url);
          console.log(params.photos);
        })
        .catch((err) => console.log(err));
    }))
      .then(() => {
        console.log(params);
        axios.post('/db/review/post', params)
          .then(() => {
            setInvoke(!invoke);
            setSort('newest');
            alert('Thank you for submitting a review');
            setCountStar(0);
            const radioBut = document.getElementsByClassName('radioButReviewForm');
            for (let i = 0; i < radioBut.length; i++) {
              radioBut[i].checked = false;
            }
            const slider = document.getElementsByClassName('checkSlider');
            slider[0].checked = false;
            setRecommendStatus(false);
            setNickname('');
            setEmail('');
            setSummaryValue('');
            setBodyValue('');
            setImageList([]);
            setReviewForm(false);
            setImageFiles([]);
          })
          .catch((err) => console.log('error in posting review', err));
      }).catch((err) => console.log(err));
  };

  return (
    <div className="reviewFormContent" data-testid="reviewFormContent">
      <br />
      <label htmlFor="nickname">
        Nickname:
        <input
          data-testid="nickname"
          type="text"
          className="nickname"
          value={nickname}
          onChange={nicknameChange}
        />
      </label>
      <label htmlFor="email">
        email:
        <input
          data-testid="email"
          type="email"
          className="email"
          value={email}
          onChange={emailChange}
        />
      </label>
      <br />
      <br />
      <div className="reviewFormStarRating">
        <ReviewStar setCountStar={setCountStar} countStar={countStar} />
      </div>
      <br />
      <div className="reviewInput">
        <ReviewInput
          setRecommendStatus={setRecommendStatus}
          recommendStatus={recommendStatus}
        />
      </div>
      <br />
      <div className="characteristic">
        <Characteristic
          rating={rating}
          click={click}
          status={status}
          setCharacteristicList={setCharacteristicList}
          setIdChacList={setIdChacList}
        />
      </div>
      <br />
      <div className="summary">
        <Summary
          summaryValue={summaryValue}
          setSummaryValue={setSummaryValue}
        />
      </div>
      <br />
      <div className="body">
        <Body
          bodyValue={bodyValue}
          setBodyValue={setBodyValue}
        />
      </div>
      <br />
      <div className="reviewPhotos">
        <ReviewPhoto
          imageList={imageList}
          setImageList={setImageList}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
      </div>
      <br />
      <text data-testid="Warning" className="submittingWarning" style={{ display: submitWarning, color: 'red' }}>Please make sure that nickname, email,rating, characteristics, and body (min of 50 characters) are all filled out before submitting</text>
      <br />
      <button className="submitReviewForm" onClick={submitForm}>Submit Review</button>
    </div>
  );
}

export default ReviewForm;
