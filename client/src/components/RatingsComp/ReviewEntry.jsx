/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoEntry from './ReviewEntryComp/PhotoEntry.jsx';
import ReviewResponse from './ReviewEntryComp/Response.jsx';

function ReviewEntry(props) {
  // console.log(props.review);
  const [body, setBody] = useState('');
  const [moreBody, setMoreBody] = useState('none');
  const [recommend, setRecommend] = useState('none');
  const [photoList, setPhotoList] = useState([]);
  const [photoDisplay, setPhotoDisplay] = useState('');
  const [response, setResponse] = useState([]);
  const [helpfulSec, setHelpfulSec] = useState('');
  const [thanks, setThanks] = useState('none');
  const [percentageRating, setPercentageRating] = useState('');
  const [verified, setVerified] = useState('none');
  const [check, setCheck] = useState('none');

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const utcDate = new Date(props.review.date);
  const month = monthNames[utcDate.getMonth()];
  const year = utcDate.getFullYear();
  const day = utcDate.getDate();
  const usernameDate = `${props.review.reviewer_name}, ${month} ${day}, ${year}`;

  useEffect(() => {
    console.log('this is review', props.review);
    const rate = props.review.rating;
    setPercentageRating(`${JSON.stringify(rate / 5 * 100)}%`);
    if (props.review.body.length > 250) {
      setBody(props.review.body.slice(0, 250));
      setMoreBody('');
    } else {
      setBody(props.review.body);
    }
    if (props.review.recommend) {
      setRecommend('');
    }
    if (props.review.photos[0]) {
      console.log('photossss', props.review.photos)
      setPhotoList(props.review.photos);
      setPhotoDisplay('none');
    } else {
      setPhotoList([]);
      setPhotoDisplay('');
    }
    if (props.review.response !== null) {
      setResponse(props.review.response);
    }
    if (props.review.verify) {
      setVerified('');
      // this is setup for verification
    }
  }, [props.review]);

  useEffect(() => {
    if (recommend === 'I recommend this product') {
      setCheck('');
    }
  }, [recommend]);

  const moreBodyClick = (e) => {
    setBody(props.review.body);
    setMoreBody('none');
  };
  const thumbUpClick = (e) => {
    axios.put(`/db/helpfulpost/${props.review.review_id}`)
      .then(() => {
        setHelpfulSec('none');
        setThanks('');
      })
      .catch(() => { console.log('fail helpful'); });
  };
  const thumbDownClick = (e) => {
    setHelpfulSec('none');
    setThanks('');
  };

  return (
    <div className="ReviewEntry">
      <span className="ratingReview">
        <div className="rating-wrap">
          <span data-testid="percentR" className="stars-active" style={{ width: `${percentageRating}` }}>
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
          </span>
          <span className="stars-inactive">
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
          </span>
        </div>
      </span>
      <div className="userNameDate">
        {usernameDate}
        <br />
        <span style={{ display: verified }}>(VERIFIED &#10003;)</span>
      </div>
      <br />
      {photoList.map((photo) => (
        <PhotoEntry photo={photo} />
      ))}
      <text style={{ display: photoDisplay }}>--no photo to display--</text>
      <br />
      <div className="summary">{props.review.summary}</div>
      <br />
      <div>{body}</div>
      <button className="moreReviewsBody" style={{ display: moreBody }} onClick={moreBodyClick}>MORE...</button>
      <br />
      <div className="recommend" style={{ display: recommend }}>
        I recommend this product
        <i className="fa fa-check-circle" />
      </div>
      <br />
      {response.map((eachRes) => (
        <ReviewResponse eachRes={eachRes} />
      ))}
      <div className="helpfulDiv" style={{ display: helpfulSec }}>
        <text className="helpfulText">Was this review helpful?</text>
        <text className="helpfulnessCount">{`(${props.review.helpfulness})`}</text>
        <button type="button" className="thumbUp" onClick={thumbUpClick}>
          <i className="fa fa-thumbs-up" />
        </button>
        <button type="button" className="thumbDown" onClick={thumbDownClick}>
          <i className="fa fa-thumbs-down" />
        </button>
      </div>
      <text className="thanksHelpful" style={{ display: thanks }}>Thanks for the input!</text>
    </div>
  );
}

export default ReviewEntry;
