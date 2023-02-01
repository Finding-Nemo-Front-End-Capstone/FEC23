/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function Body({ bodyValue, setBodyValue }) {
  const [bodyCharacterLeft, setBodyCharacterLeft] = useState(1000);
  const bodyInput = (e) => {
    if (e.target.value.length <= 1000) {
      setBodyCharacterLeft(1000 - e.target.value.length);
      setBodyValue(e.target.value);
    }
  };
  return (
    <div>
      <label>
        Body:
        <text className="bodyCharacterCount">{`${bodyCharacterLeft}Character Left`}</text>
        <br />
        <textarea rows="20" cols="70" value={bodyValue} onChange={bodyInput} placeholder='Why did you like the product or not?' />
      </label>
    </div>
  );
}

export default Body;
