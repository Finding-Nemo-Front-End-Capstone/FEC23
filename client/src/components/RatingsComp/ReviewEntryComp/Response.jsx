/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function ReviewResponse({eachRes}) {
  return (
    <div>
      <text>response from seller:  </text>
      <text className="adminResponse">{eachRes}</text>
    </div>
  );
}

export default ReviewResponse;
