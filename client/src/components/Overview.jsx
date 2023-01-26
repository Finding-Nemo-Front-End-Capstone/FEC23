import React from 'react';

function Overview({ product, rating }) {
  return (
    <div>
      hi from Overview
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.default_price}</p>
      {/* <img src={}/></img> */}
    </div>
  );
}

export default Overview;
