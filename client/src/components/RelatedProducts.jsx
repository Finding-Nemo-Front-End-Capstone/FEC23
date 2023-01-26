import React, { useState, useEffect } from "react";
import axios from "axios";

const RelatedProducts = ({id}) => {
  const [relatedIds, setRelatedIds] = useState([]);
  const [currentId, setCurrentId] = useState(id === undefined ? 40344 : id);
  useEffect(() => {
    axios.get('/related/' + currentId)
    .then((data) => {
      setRelatedIds(data.data);
    })
    .catch((err) => { console.log('there was an error', err); })
  }, [])

  const cards = relatedIds.map((singleId) => {
    axios.get('/styles/' + singleId)
    .then((data) => {
      return (
        <div>

        </div>
      )
    })
  })
  console.log(cards);

  return (
    <div>
      {cards}
    </div>
  )
}


export default RelatedProducts;