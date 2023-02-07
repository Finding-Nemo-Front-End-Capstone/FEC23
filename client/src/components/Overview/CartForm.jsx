import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartForm({ currStyle }) {

  const [currSize, setCurrSize] = useState('SELECT SIZE');
  const [currQty, setCurrQty] = useState(0);
  const [selectedQty, setSelectedQty] = useState(0);

  let values = Object.values(currStyle.skus);

  function handleSize(e) {setCurrSize(e.target.value)};
  function handleQty(e) {setSelectedQty(e.target.value)};

  useEffect(() => {
    for (let i = 0; i < values.length; i++) {
      if (currSize === "select-size") {
        setCurrQty(0);
      } else if (values[i].size === currSize) {
        setCurrQty(values[i].quantity);
      }
    }
  }, [currSize])

  function quantities(currQty) {
    const options = [];
    let i = 1;
    while (i < currQty && i <= 15) {
      options.push(<option key={i} value={i}>{i}</option>);
      i++;
    }
    return options;
  }

  function handleClick() {
    let skus = currStyle.skus;
    let sku;
    for (let key in skus) {
      if (skus[key].size === currSize) {
        sku = key;
      }
    }

    for (let i = 1; i <= selectedQty; i++) {
      axios.post("/db/cart", {"sku_id":sku})
        .then((response) => {console.log(response)})
        .catch((error) => {console.log(error)})
    }
  }
  console.log('qty', selectedQty)

  return (
    <div className="cart-form">
      <select className="size-list" id="1" value={currSize} onChange={handleSize}>
        <option value="select-size" >SELECT SIZE</option>
        {values.map((sku, i) => {
          return <option key={i} value={sku.size} >{sku.size}</option>
        })}
      </select>
      <select name="qty-list" id="2" onChange={handleQty}>
        {currQty && currSize !== "select-size"
        ? quantities(currQty)
        : <option value="select-qty">-</option>}
      </select>
      <button onClick={handleClick}>ADD TO BAG     +</button>
      <button>☆</button>
    </div>

  )
}

export default CartForm;