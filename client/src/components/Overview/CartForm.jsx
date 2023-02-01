import React, { useState, useEffect } from 'react';

const CartForm = ({ currStyle }) => {

  const [currSize, setCurrSize] = useState('option 1');

  let values = Object.values(currStyle.skus);
  // console.log(currStyle.skus)
  // console.log(values)

  return (
    <div className="cart-form">
      <select className="selectList1" id="selectList1" placeholder="SELECT SIZE">
        <option value="option 1">SELECT SIZE</option>
        {values.map((sku, i) => {
          return <option key={i} value={i}>{sku.size}</option>
        })}
      </select>
      <select name="selectList2" id="selectList2">
        <option value="option 1">-</option>
        <option value="option 2">Option 2</option>
      </select>
      <button>ADD TO BAG     +</button>
      <button>☆</button>
    </div>

  )
}

export default CartForm;
