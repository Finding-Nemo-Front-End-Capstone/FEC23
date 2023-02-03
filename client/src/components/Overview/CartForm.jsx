import React, { useState, useEffect } from 'react';

function CartForm({ currStyle }) {

  const [currSize, setCurrSize] = useState('SELECT SIZE');
  const [currQty, setCurrQty] = useState(0);
  console.log('size', currSize)


  let values = Object.values(currStyle.skus);
  // let
  // for (var i = 0; i < values.length; i++) {
  //   if (values[i][size])
  // }

  // console.log(currStyle.skus)
  console.log('values',values)

  // onChange={handleChange(i)}
  const handleChange = (e) => {
    console.log(e.target.value)
    setCurrSize(e.target.value);
    // setCurrQty(values[])
  }
  console.log('currQty', currQty)



  return (
    <div className="cart-form">
      <select className="size-list" id="1" value={currSize} onChange={handleChange}>
        <option value="select-size" >SELECT SIZE</option>
        {values.map((sku, i) => {
          return <option key={i} value={sku.size} >{sku.size}</option>
        })}
      </select>
      {/* <select name="qty-list" id="2">
        <option value="select-qty">-</option>
        {values.map((sku, i) => {
          return <option key={i} value={sku.quantity}>{sku.quantity}</option>
        })}
      </select> */}
      <button>ADD TO BAG     +</button>
      <button>☆</button>
    </div>

  )
}

export default CartForm;

{/* <div className="select-container">
<SelectInput
  options={optionsLvl1}
  selectedOption={selectedLvl1}
  setSelectedOption={setSelectedLvl1}
/>
<SelectInput
  options={optionsLvl2}
  selectedOption={selectedLvl2}
  setSelectedOption={setSelectedLvl2}
/>
</div> */}