/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function Summary({ summaryValue, setSummaryValue }) {
  const [summaryCharacterLeft, setSummaryCharacterLeft] = useState(60);
  const summaryInput = (e) => {
    if (e.target.value.length <= 60) {
      setSummaryCharacterLeft(60 - e.target.value.length);
      setSummaryValue(e.target.value);
    }
  };
  return (
    <div>
      <label>
        Summary:
        <text className="summaryCharacterCount">{`${summaryCharacterLeft}Character Left`}</text>
        <br />
        <textarea rows="2" cols="30" value={summaryValue} onChange={summaryInput} placeholder="Example: Best purchase ever!" />
      </label>
    </div>
  );
}

export default Summary;
