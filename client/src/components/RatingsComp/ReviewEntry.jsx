/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoEntry from './PhotoEntry.jsx';

function ReviewEntry(props) {
  // console.log(props.review);
  const [body, setBody] = useState('');
  const [moreBody, setMoreBody] = useState('none');
  const [recommend, setRecommend] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [photoDisplay, setPhotoDisplay] = useState('');

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const utcDate = new Date(props.review.date);
  const month = monthNames[utcDate.getMonth()];
  const year = utcDate.getFullYear();
  const day = utcDate.getDate();
  const usernameDate = `${props.review.reviewer_name}, ${month} ${day}, ${year}`;

  useEffect(() => {
    if (props.review.body.length > 250) {
      setBody(props.review.body.slice(0, 250));
      setMoreBody('');
    } else {
      setBody(props.review.body);
    }
    if (props.review.recommend) {
      setRecommend('recommend');
    } else {
      setRecommend('not recommend');
    }
    if (props.review.photos[0]) {
      setPhotoList(props.review.photos);
      setPhotoDisplay('none');
    }
  }, [props.review]);

  const moreBodyClick = (e) => {
    setBody(props.review.body);
    setMoreBody('none');
  };

  return (
    <div>
      <label>rating: </label>
      <text className="rating">{props.review.rating}</text>
      <br />
      <text>{usernameDate}</text>
      <br />
      {photoList.map((photo) => (
        <PhotoEntry photo={photo} />
      ))}
      <text style={{display:photoDisplay}}>--no photo to display--</text>
      <br style={{display:photoDisplay}}/>
      <label>summary: </label>
      <text className="summary">{props.review.summary}</text>
      <br />
      <label>body: </label>
      <text>{body}</text>
      <button style={{ display: moreBody }} onClick={moreBodyClick}>more reviews</button>
      <br />
      <text className="recommend">{recommend}</text>
      <br />
      <text>----------------------------------------------------</text>
    </div>
  );
}

export default ReviewEntry;
