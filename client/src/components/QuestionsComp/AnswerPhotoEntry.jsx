/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionPhotoEntry({ photo }) {
  const [hugeimage, setHugeImage] = useState(false);
  const imgClick = (e) => {
    setHugeImage(!hugeimage);
  };
  return (
    <div className="divEachReviewPhoto">
      <img className="answer-tile-photo" src={photo.url} onClick={imgClick} />
      {hugeimage
        && (
        <div className="reviewForm" onClick={imgClick}>
          <div className="overlay">
            <img src={photo.url} className="answers-photo-entry" />
          </div>
        </div>
        )}
    </div>
  );
}

export default QuestionPhotoEntry;
