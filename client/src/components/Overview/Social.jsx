import React, { useState, useEffect } from 'react';

function Social() {
  const url = 'localhost:3000';
  const text = 'Check this out!';
  function clickFacebook () {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }
  function clickTwitter () {
    window.open(`https://www.twitter.com/intent/tweet?url=${url}&text=${text}`);
  }
  function clickPinterest () {
    window.open(`https://www.pinterest.com/pin/create/link/?url=${url}&description=${text}`);
  }
  return (
    <div className="social">
      <i className="fa fa-facebook-square" onClick={clickFacebook} />
      <i className="fa fa-twitter-square" onClick={clickTwitter} />
      <i className="fa fa-pinterest-square" onClick={clickPinterest} />
    </div>
  );
}

export default Social;
