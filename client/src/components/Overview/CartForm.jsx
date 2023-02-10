import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartForm({ currStyle }) {
  const [currSize, setCurrSize] = useState('select-size');
  const [currQty, setCurrQty] = useState(0);
  const [selectedQty, setSelectedQty] = useState(0);
  const [warning, setWarning] = useState(false);

  const values = Object.values(currStyle.skus);

  function handleSize(e) { setCurrSize(e.target.value); }
  function handleQty(e) { setSelectedQty(e.target.value); }

  console.log('size', currSize)

  useEffect(() => {
    for (let i = 0; i < values.length; i++) {
      if (currSize === 'select-size') {
        setCurrQty(0);
      } else if (values[i].size === currSize) {
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

  function handleClick() {
    if (currSize === 'select-size') {
      // const x = document.getElementById("size");
      // x.size = x.options.length;
      setWarning(true);
    } else {
      setWarning(false);
      const { skus } = currStyle;
      let sku;
      for (const key in skus) {
        if (skus[key].size === currSize) {
          sku = key;
        }
      }

      for (let i = 1; i <= selectedQty; i++) {
        axios.post('/db/cart', { sku_id: sku })
          .then((response) => { console.log(response); })
          .catch((error) => { console.log(error); });
      }
    }
  }

  return (
    <form className="cart-form">
      {warning ? <p style={{color: 'red'}}>Please select size</p> : null}
      <select className="size-list" data-testid="select-size" id="sizes" value={currSize} onChange={handleSize}>
        <option value="select-size">SELECT SIZE</option>
        {values.map((sku, i) => <option data-testid="size" key={i} value={sku.size}>{sku.size}</option>)}
      </select>
      <select name="qty-list" id="2" onChange={handleQty}>
        {currQty && currSize !== 'select-size'
          ? quantities(currQty)
          : <option value="select-qty">-</option>}
      </select>
      <button data-testid="bag" onClick={handleClick}>ADD TO BAG</button>
      <button>☆</button>
    </form>

  );
}

export default CartForm;
