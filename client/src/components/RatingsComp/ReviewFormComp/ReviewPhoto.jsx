/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function ReviewPhoto() {
  return (
    <div>
      <label>
        Upload photos:
        {' '}
        <label for="files" class>+</label>
        <input id="files" type="file" className="reviewUploadPhoto" style={{"visibility":"hidden"}}/>
      </label>
    </div>
  );
}

export default ReviewPhoto;
