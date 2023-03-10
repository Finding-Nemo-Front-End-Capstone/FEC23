/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewInput({ setRecommendStatus, recommendStatus, testId }) {
  const recommendClick = (e) => {
    setRecommendStatus(!recommendStatus);
  };

  return (
    <div>
      <label>recommend :</label>
      <label className="switch">
        <input data-testid="recommendinput" type="checkbox" className="checkSlider" onClick={recommendClick} />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default ReviewInput;
