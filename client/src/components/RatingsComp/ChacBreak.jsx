/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';


function ChacBreak({rating}) {
  const [bar5, setBar5] = useState('');


  return (
    <div className='chacBreak'>
      <div class="bar-container">
      <span className="arrow-comfort">&#8679;</span>
        <div class="bar-container1" ></div>
        <div class="bar-container2" ></div>
      </div>
    </div>
  )
}

export default ChacBreak;
