import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewEntry(props) {
  let recommend = '';
  if (props.recommend) {
    recommend = 'recommend';
  } else {
    recommend = 'not recommend';
  }

  return (
    <div>
      <label>rating: </label>
      <text className="rating">{props.review.rating}</text>
      <br />
      <label>summary: </label>
      <text className="summary">{props.review.summary}</text>
      <br />
      <text className="recommend">{recommend}</text>
      <br />
      <text>----------------------------------------------------</text>
    </div>
  );
}

export default ReviewEntry;
