import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';
import RelatedStars from './RelatedStars.jsx';

function RelatedCards({ relInfo, product, setProduct, display }) {
  const [cardInfo, setCardInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('relInfo is', relInfo);
    setCardInfo(relInfo);
  }, [relInfo, display]);

  function clickModal(e) {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(!showModal);
  }
  function clickNav(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('this was clicked', cardInfo.id);
    setProduct({id : cardInfo.id});
  }
  return (
    <div className="cardInfo">
      <button type="submit" className="modalButton" onClick={clickModal}>
        ⭐
      </button>
      <Modal show={showModal} setShowModal={setShowModal} relFeat={relInfo.features}
        relName={cardInfo.name} currFeat={product.features} currName={product.name}
      />
      <div className="relatedImageContainer">
        {cardInfo.thumbnail === null
          ? <img className="previewImage" alt="" />
          : <img className="previewImage" src={cardInfo.thumbnail} alt="" />}
      </div>
      <div className="cardDetails" onClick={clickNav}>
        <div className="relatedCatText">
          {cardInfo.category ? cardInfo.category.toUpperCase() : null}
        </div>
        <div className="relatedProdText">
          {cardInfo.name}
        </div>
        <div className="relatedPriceText">
          ${cardInfo.price}
        </div>
        <div className="starRating">
          {cardInfo.rating ? <RelatedStars rating={cardInfo.rating} /> : null}
        </div>
      </div>
    </div>
  );
}

export default RelatedCards;
