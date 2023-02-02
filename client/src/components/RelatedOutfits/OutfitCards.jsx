import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OutfitCards({ product, setHasCurrent, setSaved }) {
  const [cardInfo, setCardInfo] = useState({});
  useEffect(() => {
    const copy = cardInfo;
    copy.id = product.id;
    copy.category = product.category;
    copy.name = product.name;
    copy.price = product.price;
    copy.rating = 5;
    setCardInfo(copy);
  }, [localStorage]);

  useEffect(() => {
    const copy = cardInfo;
    axios.get(`db/styles/${product.id}`)
      .then((data) => {
        copy.thumbnail = data.data.results[0].photos[0].thumbnail_url;
        setCardInfo(copy);
      })
      .catch(() => console.log('error getting style in outfitcards'));
  }, [cardInfo]);
  function clickExit(e) {
    e.stopPropagation();
    e.preventDefault();
    const temp = JSON.parse(localStorage.getItem('outfits'));
    const output = temp.filter((item) => item.id !== cardInfo.id);
    localStorage.setItem('outfits', JSON.stringify(output));
    setCardInfo({});
    setHasCurrent(false);
    setSaved(output);
  }
  return (
    <div className="outfitInfo" name={product.id}>
      <button type="submit" className="outfitButton" onClick={clickExit}>
        ✖
      </button>
      <div className="outfitImageContainer">
        {cardInfo.thumbnail === null
          ? <img className="previewImage" alt="" />
          : <img className="previewImage" src={cardInfo.thumbnail} alt="" />}
      </div>
      <div className="details">
        <>{cardInfo.category}</>
        <br />
        {cardInfo.name}
        <br />
        $
        {cardInfo.price}
        <br />
        {cardInfo.rating}
        <br />
      </div>
    </div>
  );
}

export default OutfitCards;
