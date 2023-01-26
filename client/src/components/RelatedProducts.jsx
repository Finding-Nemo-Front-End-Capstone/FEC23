import React, { useState, useEffect } from "react";
import axios from "axios";
import RelatedCards from './RelatedCards.jsx';

function RelatedProducts({ id }) {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40344 : id);
  useEffect(() => {
    axios.get('/db/related/' + currentId)
    .then((data) => { setRelatedIds(data.data); })
    .catch((err) => { console.log('there was an error', err); })
  }, [])

  const cards = relatedIds.map((singleId) => {
    return (
      <div>
        {singleId}
        <RelatedCards id={singleId} />
      </div>
    )
  })

  return (
    <div>
      {cards}
    </div>
  );
}

export default RelatedProducts;
