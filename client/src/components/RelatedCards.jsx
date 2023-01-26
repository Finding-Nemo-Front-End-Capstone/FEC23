import React, { useState, useEffect } from "react";
import axios from "axios";


const RelatedCards = ({id}) => {
  const [cardInfo, setCardInfo] = (useState(
    {
      "thumbnail": null, "category": "",
      "Product Name": "", "Price": "",
      "Rating": ""
    }))

  useEffect(() => {
    axios.get('db/styles' + id)
    .then((data) => {
      let temp = {...cardInfo};
      let res = data.data.results[0];
      temp["thumbnail"] = res.photos[0]["thumbnail_url"];
      setCardInfo(temp);
    })
    .then(() => {
      axios.get('/' + id)
      .then((data) => {
        temp["category"] = data.data["category"];
        temp["Product Name"] = data.data["name"];
        temp["Price"] = data.data["default_price"];
        temp["Rating"] = 0;
      })
    })
  }, [])

  return (
      {temp["thumbnail"]}
  )
}

export default RelatedCards;