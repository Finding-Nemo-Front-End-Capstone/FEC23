import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PhotoEntry(props) {
  console.log(props.photo.url);
  return (
    <div class='review-photo'>
      <img src={props.photo.url}/>
    </div>
  );
}

export default PhotoEntry;