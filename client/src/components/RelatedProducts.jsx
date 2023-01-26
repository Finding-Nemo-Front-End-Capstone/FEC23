/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCards from './RelatedCards.jsx';

function RelatedProducts({ id }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40344 : id);
  useEffect(() => {
    axios.get(`/db/related/${currentId}`)
      .then((data) => { setRelatedIds(data.data); })
      .catch((err) => { console.log('there was an error', err); });
  }, []);

  const cards = relatedIds.map((singleId) => (
    <div className="relatedCard">
      {singleId}
      <RelatedCards id={singleId} />
    </div>
  ));

  return (
    <div className="relatedContainer">
      {cards}
    </div>
  );
}

export default RelatedProducts;
