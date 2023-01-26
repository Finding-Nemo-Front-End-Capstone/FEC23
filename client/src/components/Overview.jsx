import React from 'react';

const Overview = ({ product, rating }) => {
  console.log('current product', product)

  if (product.id) {
    console.log('ratings', rating.ratings)
    // let ratings = rating.ratings;
    // let reviewCount = 0;
    // let total = 0;
    // for (let stars in ratings) {
    //   reviewCount += ratings[stars];
    //   total += (stars * ratings[stars]);
    // }
    // let avgRating = total / reviewCount;
    // console.log('avg', avgRatings)
  }

  // }, [product])

  // useEffect(() => {
  //   axios.get('/db/styles/' + currentId)
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
      {/* <p>Read all {rating</p> */}
      {/* <img src={}/></img> */}
    </div>
  )
};

export default Overview;
