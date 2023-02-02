/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhotoEntry(props) {
  // console.log(props.photo.url);
  const [hugeimage, setHugeImage] = useState(false);
  const imgClick = (e) => {
    setHugeImage(!hugeimage);
  };
  return (
    <div>
      <img className="eachReviewPhoto" src={props.photo.url} onClick={imgClick}/>

      {hugeimage
        && (
        <div className="reviewForm">
          <div className="overlay">
            <button className="closeReviewForm" onClick={imgClick}>x</button>
            <text>try</text>
          </div>
        </div>
        )}
    </div>
  );
}

export default PhotoEntry;
