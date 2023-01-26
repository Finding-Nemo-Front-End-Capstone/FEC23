import React, { useState, useEffect } from "react";
import axios from "axios";


const RelatedCards = ({id}) => {
  const [cardInfo, setCardInfo] = (useState(
    {
      "thumbnail": null, "category": "",
      "Product Name": "", "Price": "23.88",
      "Rating": ""
    }))

  useEffect(() => {
    let temp = {...cardInfo};
    axios.get('/db/' + id)
    .then((data) => {
      temp["category"] = data.data["category"];
      temp["Product Name"] = data.data["name"];
      temp["Price"] = data.data["default_price"];
      temp["Rating"] = 0;
    })
    axios.get('/db/styles/' + id)
    .then((data) => {
      // console.log(data.data.results[0]["photos"][0]["thumbnail_url"]);
      temp["thumbnail"] = data.data.results[0]["photos"][0]["thumbnail_url"];
    })
    setCardInfo(cardInfo);
  }, [])

  return (
    <div>
      This is card info
      {cardInfo["Price"]}
      {cardInfo["Rating"]}
    </div>
  )
}

export default RelatedCards;