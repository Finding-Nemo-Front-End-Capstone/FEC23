import React, { useState, useEffect } from 'react';
import AddAnswerPhotoEntry from './AddAnswerPhotoEntry.jsx';

function AddAnswerPhoto({
  imageUrls, setImageUrls, imageFiles, setImageFiles,
}) {
  const [chooseFile, setChooseFile] = useState('');

  useEffect(() => {
    if (imageUrls.length === 0) {
      setChooseFile('');
    }
  }, [imageUrls]);
  const submitPhoto = (e) => {
    if (imageUrls.length < 5) {
      const arr1 = imageFiles.slice();
      arr1.push(e.target.files[0]);
      setImageFiles(arr1);
      const photo = URL.createObjectURL(e.target.files[0]);
      const arr = imageUrls.slice();
      arr.push(photo);
      setImageUrls(arr);
      if (imageUrls.length === 4) {
        setChooseFile('none');
      }
    }
  };
  return (
    <div>
      <label>
        Upload photos:
        {' '}
        <input id="files" type="file" className="reviewUploadPhoto" onChange={submitPhoto} style={{ display: chooseFile }} title="work" />
        <div className="review-photo">
          {imageUrls.map((image) => <AddAnswerPhotoEntry image={image} imageUrls={imageUrls} setImageUrls={setImageUrls} setChooseFile={setChooseFile} />)}
        </div>
      </label>
    </div>
  );
}

export default AddAnswerPhoto;
