/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function ReviewFormPhotoEntry({
  image, imageList, setImageList, setChooseFile,
}) {
  const removeUploadPic = (e) => {
    const updateImageList = [];
    console.log(imageList);
    for (let i = 0; i < imageList.length; i++) {
      if (imageList[i] === image) {
        continue;
      } else {
        updateImageList.push(imageList[i]);
      }
    }
    setImageList(updateImageList);
    setChooseFile('');
  };
  return (
    <div className="divReviewFormPhotoEntry">
      <img src={image} className="ReviewFormPhotoEntry" />
      <button className="removePicture" onClick={removeUploadPic}>x</button>
    </div>
  );
}

export default ReviewFormPhotoEntry;
