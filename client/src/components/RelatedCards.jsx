/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RelatedCards({ id }) {
  const [cardInfo, setCardInfo] = useState(
    {
      id: '',
      category: '',
      name: '',
      price: '',
      rating: '',
    },
  );
  const [image, setImage] = useState({ thumbnail: null });
  const createInfo = () => axios.get(`/db/${id}`)
    .then((data) => {
      const temp = { ...cardInfo };
      temp.category = data.data.category;
      temp.name = data.data.name;
      temp.price = data.data.default_price;
      temp.rating = 5;
      setCardInfo(temp);
    });

  const attachImage = () => {
    const temp = { ...image };
    return axios.get(`/db/styles/${id}`)
      .then((data) => {
        temp.thumbnail = data.data.results[0].photos[0].thumbnail_url;
        setImage(temp);
      });
  };
  useEffect(() => {
    createInfo();
  }, []);

  useEffect(() => {
    attachImage();
  }, [cardInfo]);

  return (
    <div className="cardInfo">
      <div className="relatedImageContainer">
        {image.thumbnail === null
          ? <img className="previewImage" alt="" />
          : <img className="previewImage" src={image.thumbnail} alt="" />}
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

export default RelatedCards;
