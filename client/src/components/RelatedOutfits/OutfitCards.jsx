import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedStars from './RelatedStars.jsx';

function OutfitCards({ product, saved, setHasCurrent, setSaved }) {
  const [cardInfo, setCardInfo] = useState({});
  useEffect(() => {
    const copy = { ...cardInfo };
    copy.id = product.id;
    copy.category = product.category;
    copy.name = product.name;
    copy.price = product.price;
    copy.rating = product.rating;
    copy.thumbnail = product.thumbnail;
    setCardInfo(copy);
  }, [product]);

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
          ? <img className="previewImage" alt="Image missing" />
          : <img className="previewImage" src={cardInfo.thumbnail} alt="Image missing" />}
      </div>
      <div className="cardDetails">
        <div className="outfitCatText">
          {cardInfo.category ? cardInfo.category.toUpperCase() : null}
        </div>
        <div className="outfitProdText">
          {cardInfo.name}
        </div>
        <div className="outfitPriceText">
          ${cardInfo.price}
        </div>
        <div className="starRating">
          {cardInfo.rating ? <RelatedStars rating={cardInfo.rating} /> : null}
        </div>
      </div>
    </div>
  );
}

export default OutfitCards;
