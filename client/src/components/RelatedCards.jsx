/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';

function RelatedCards({ id, product }) {
  const [cardInfo, setCardInfo] = useState(
    {
      id: '',
      category: '',
      name: '',
      price: '',
      rating: '',
    },
  );
  const [features, setFeatures] = useState([]);
  const [image, setImage] = useState({ thumbnail: null });
  const [showModal, setShowModal] = useState(false);
  const createInfo = () => axios.get(`/db/${id}`)
    .then((data) => {
      const temp = { ...cardInfo };
      temp.category = data.data.category;
      temp.name = data.data.name;
      temp.price = data.data.default_price;
      temp.rating = 5;
      setFeatures(data.data.features);
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
  }, [id]);

  useEffect(() => {
    attachImage();
  }, [cardInfo]);
  function clickNewProduct(e) {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(!showModal);
  }
  return (
    <button type="submit" className="cardInfo" name={id} onClick={clickNewProduct}>
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        relFeat={features}
        relName={cardInfo.name}
        currFeat={product.features}
        currName={product.name}
      />
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
    </button>
  );
}

export default RelatedCards;
