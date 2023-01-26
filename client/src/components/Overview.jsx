import React from 'react';

const Overview = ({ product }) => {
  console.log('current product', product)

  return (
    <div>hi from Overview
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.default_price}</p>
      <img src={}/></img>
    </div>
  )
};

export default Overview;