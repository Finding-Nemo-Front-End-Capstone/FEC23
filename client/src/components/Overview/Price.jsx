import React, { useState, useEffect } from 'react';

function Price({ currStyle }) {
  if (currStyle.sale_price) {
    return (
      <div>
        <span className="strikethrough">${currStyle.original_price}</span>
        <span className="red"> ${currStyle.sale_price}</span>
      </div>
    );
  }
  return <span>${currStyle.original_price}</span>;

  // return (
  //   <div>
  //     {currStyle.sale_price
  //     ? <span className="on-sale">${currStyle.original_price}</span>
  //       <span>${currStyle.sale_price}</span>
  //     : <span>${currStyle.original_price}</span>
  //     }
  //   </div>
  // )
}

export default Price;
