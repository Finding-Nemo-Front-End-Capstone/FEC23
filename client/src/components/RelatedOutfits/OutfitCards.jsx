import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OutfitCards({ product }) {
  const [cardInfo, setCardInfo] = useState(
    {
      category: '',
      name: '',
      price: '',
      rating: '',
      thumbnail: null,
    },
  );
  useEffect(() => {
    const copy = cardInfo;
    copy.category = product.category;
    copy.name = product.name;
    copy.price = product.price;
    copy.rating = 5;
    setCardInfo(copy);
  }, [product, localStorage]);

  useEffect(() => {
    const copy = cardInfo;
    axios.get(`db/styles/${product.id}`)
      .then((data) => {
        copy.thumbnail = data.data.results[0].photos[0].thumbnail_url;
        setCardInfo(copy);
      })
      .catch(() => console.log('error getting style in outfitcards'));
  }, cardInfo);
  function clickOutfit(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  return (
    <div className="outfitCard" name={product.id}>
      <div className="outfitImageContainer">
        {cardInfo.thumbnail === null
          ? <img className="previewImage" alt="" />
          : <img className="previewImage" src={cardInfo.thumbnail} alt="" />}
      </div>
      <div className="details">
        {cardInfo.category}
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
