/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import ReviewFormPhotoEntry from './ReviewFormPhotoEntry.jsx';
import {ClickContext} from '../../../index.jsx'

function ReviewPhoto({ imageList, setImageList, imageFiles, setImageFiles }) {
  // const {clicks, handleClick} = useContext(ClickContext);
  const [chooseFile, setChooseFile] = useState('');

  useEffect(() => {
    if (imageList.length === 0) {
      setChooseFile('');
    }
  }, [imageList]);
  const submitPhoto = (e) => {
    // handleClick()
    if (imageList.length < 5) {
      let arr1 = imageFiles.slice();
      arr1.push(e.target.files[0])
      setImageFiles(arr1);
      const photo = URL.createObjectURL(e.target.files[0]);
      const arr = imageList.slice();
      arr.push(photo);
      setImageList(arr);
      if (imageList.length === 4) {
        setChooseFile('none');
      }
    }
  };
  return (
    <div>
      <label>
        Upload photos:
        {' '}
        <input onSubmit={submitPhoto} id="files" type="file" className="reviewUploadPhoto" onChange={submitPhoto} style={{ display: chooseFile }} title="work" />
        <div className="review-photo">
          {imageList.map((image) => <ReviewFormPhotoEntry image={image} imageList={imageList} setImageList={setImageList} setChooseFile={setChooseFile} />)}
        </div>
      </label>
    </div>
  );
}

export default ReviewPhoto;
