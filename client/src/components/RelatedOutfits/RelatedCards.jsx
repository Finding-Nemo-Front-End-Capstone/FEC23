import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';

function RelatedCards({ id, product }) {
  const [cardInfo, setCardInfo] = useState({});
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const createInfo = () => axios.get(`/db/${id}`)
    .then((data) => {
      const temp = { ...cardInfo };
      temp.category = data.data.category;
      temp.name = data.data.name;
      temp.price = data.data.default_price;
      temp.rating = 5;
      setCardInfo(temp);
      setFeatures(data.data.features);
    });

  const attachImage = () => {
    const temp = { ...cardInfo };
    return axios.get(`/db/styles/${id}`)
      .then((data) => {
        temp.thumbnail = data.data.results[0].photos[0].thumbnail_url;
        setCardInfo(temp);
      });
  };
  useEffect(() => {
    createInfo();
  }, [id]);

  useEffect(() => {
    attachImage();
  }, [features]);
  function clickModal(e) {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(!showModal);
  }
  return (
    <div className="cardInfo">
      <button type="submit" className="modalButton" onClick={clickModal}>
        ⭐
      </button>
      <Modal show={showModal} setShowModal={setShowModal} relFeat={features}
        relName={cardInfo.name} currFeat={product.features} currName={product.name}
      />
      <div className="relatedImageContainer">
        {cardInfo.thumbnail === null
          ? <img className="previewImage" alt="" />
          : <img className="previewImage" src={cardInfo.thumbnail} alt="" />}
      </div>
      <div className="cardDetails">
        {cardInfo.category}
        <br />
        {cardInfo.name}
        <br />
        ${cardInfo.price}
        <br />
        {cardInfo.rating}
        <br />
      </div>
    </div>
  );
}

export default RelatedCards;
