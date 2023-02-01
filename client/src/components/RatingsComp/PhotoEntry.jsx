/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhotoEntry(props) {
  // console.log(props.photo.url);
  return (
      <img className='eachReviewPhoto' src={props.photo.url} />
  );
}

export default PhotoEntry;