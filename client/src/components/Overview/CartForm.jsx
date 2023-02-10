import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartForm({ currStyle }) {
  const [currSize, setCurrSize] = useState('select-size');
  const [currQty, setCurrQty] = useState(0);
  const [selectedQty, setSelectedQty] = useState(0);
  const [noWarning, setNoWarning] = useState(true);

  const values = Object.values(currStyle.skus);

  function handleSize(e) { setCurrSize(e.target.value); }
  function handleQty(e) { setSelectedQty(e.target.value); }

  useEffect(() => {
    for (let i = 0; i < values.length; i++) {
      // if (currSize === 'select-size') {
      //   setCurrQty(0);
      // } else
      if (values[i].size === currSize) {
        setCurrQty(values[i].quantity);
      }
    }
  }, [currSize]);

  function quantities(qty) {
    const options = [];
    let i = 1;
    while (i < qty && i <= 15) {
      options.push(<option key={i} value={i}>{i}</option>);
      i++;
    }
    return options;
  }

  const { skus } = currStyle;
  let sku;
  for (const key in skus) {
    if (skus[key].size === currSize) {
      sku = key;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (currSize === 'select-size') {
      // const x = document.getElementById("size");
      // x.size = x.options.length;
      setNoWarning(false);
    } else {
      setNoWarning(true);
      for (let i = 1; i <= selectedQty; i++) {
        axios.post('/db/cart', { sku_id: sku })
          .then((response) => { console.log(response); })
          .catch((error) => { console.log(error); });
      }
    }
  }

  return (
    <form className="cart-form">
      {/* {warning ? <p style={{color: 'red'}}>Please select size</p> : null} */}
      <p style={{color: 'red'}} hidden={noWarning}>Please select size</p>
      <select className="size-list" data-testid="select-size" id="sizes" value={currSize} onChange={handleSize}>
        <option value="select-size">SELECT SIZE</option>
        {values.map((sku, i) => <option data-testid="size" key={i} value={sku.size}>{sku.size}</option>)}
      </select>
      <select name="qty-list" id="2" onChange={handleQty}>
        {currQty && currSize !== 'select-size'
          ? quantities(currQty)
          : <option value="select-qty">-</option>}
      </select>
      <button data-testid="bag" onClick={(e) => handleClick(e)}>ADD TO BAG</button>
      <button>☆</button>
    </form>

  );
}

export default CartForm;
