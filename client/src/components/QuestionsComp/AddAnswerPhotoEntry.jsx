import React, { useState, useEffect } from 'react';

function AddAnswerPhotoEntry({
  image, imageUrls, setImageUrls, setChooseFile,
}) {
  const removeUploadPic = (e) => {
    console.log('even', e);
    const updateImageList = [];
    console.log(imageUrls);
    for (let i = 0; i < imageUrls.length; i++) {
      if (imageUrls[i] === image) {
        continue;
      } else {
        updateImageList.push(imageUrls[i]);
      }
    }
    setImageUrls(updateImageList);
    setChooseFile('');
  };
  return (
    <div className="divReviewFormPhotoEntry">
      <img src={image} className="ReviewFormPhotoEntry" />
      <button className="removePicture" onClick={removeUploadPic}>x</button>
    </div>
  );
}

export default AddAnswerPhotoEntry;
