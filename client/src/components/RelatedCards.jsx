import React, { useState, useEffect } from "react";
import axios from "axios";

const RelatedCards = ({id}) => {
  const [cardInfo, setCardInfo] = useState(
    { "id": "", "category": "", "name": "",
      "price": "", "rating": ""
    })
  const [image, setImage] = useState({"thumbnail": null})
  const createInfo = () => {
    return axios.get('/db/' + id)
    .then((data) => {
      let temp = {...cardInfo};
      temp["category"] = data.data["category"];
      temp["name"] = data.data["name"];
      temp["price"] = data.data["default_price"];
      temp["rating"] = 5;
      setCardInfo(temp);
    })
  }

  const attachImage = () => {
    let temp = {...image}
    return axios.get('/db/styles/' + id)
    .then((data) => {
      temp["thumbnail"] = data.data.results[0]["photos"][0]["thumbnail_url"];
      setImage(temp);
    })
  }
  useEffect(() => {
    createInfo();
  }, [])

  useEffect(() => {
    attachImage();
  }, [cardInfo]);

  return (
    <div className="cardInfo">
      {image["thumbnail"] === null ?
        <img width="250" height="250"/>:
        <img src={image["thumbnail"]} width="250" height="250"/>
      }
      <div className="details">
        Name: {cardInfo["name"]} <br />
        Category: {cardInfo["category"]} <br />
        Price: {cardInfo["price"]} <br />
        Rating: {cardInfo["rating"]} <br />
      </div>

    </div>
  )
}

export default RelatedCards;