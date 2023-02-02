/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
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
    <div className="divEachReviewPhoto">
      <img className="eachReviewPhoto" src={props.photo.url} onClick={imgClick} />

      {hugeimage
        && (
        <div className="reviewForm" onClick={imgClick}>
          <div className="overlay">
            <img src={props.photo.url} className="imgHuge" />
          </div>
        </div>
        )}
    </div>
  );
}

export default PhotoEntry;
