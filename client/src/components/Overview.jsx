import React from 'react';

const Overview = ({ product }) => {
  console.log('current product', product)


  // useEffect(() => {
  //   axios.get('/styles/' + currentId)
  //   .then((data) => {
  //     console.log(data)
  //   })
  //   .catch((err) => { console.log('there was an error', err); })
  // }, [])

  // const cards = relatedIds.map((singleId) => {
  //   axios.get('/styles/' + singleId)
  //   .then((data) => {
  //     return (
  //       <div>

  //       </div>
  //     )
  //   })
  // })

  return (
    <div>hi from Overview
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.default_price}</p>
      {/* <img src={}/></img> */}
    </div>
  )
};

export default Overview;
