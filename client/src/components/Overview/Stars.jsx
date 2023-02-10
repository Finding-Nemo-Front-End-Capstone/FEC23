import React, { useState, useEffect } from 'react';

function Stars({ product, rating }) {
  const [reviewCount, setReviewCount] = useState(0);
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    if (rating.product_id) {
      let count = 0;
      let total = 0;
      if (rating.ratings) {
        for (const stars in rating.ratings) {
          count += Number(rating.ratings[stars]);
          total += (Number(stars) * Number(rating.ratings[stars]));
        }
        setReviewCount(count);
      }
      const avgRating = (Math.round((total / count) * 4) / 4).toFixed(2);
      // setPercentage(`${JSON.stringify((avgRating / 5) * 100)}%`);
      setPercentage((avgRating / 5) * 100);
    }
  }, [rating]);

  function handleClick() {
    const element = document.getElementById("app").getElementsByClassName("RatingsReview")[0];
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  return (
    <div>
      <span className="rating">
        <div className="rating-wrap">
          <span className="stars-active" style={{ width: `${percentage}%` }}>
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
          </span>
          <span className="stars-inactive">
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
          </span>
        </div>
        <span className="read-all-reviews" onClick={handleClick}>
          Read all
          {' '}
          {reviewCount}
          {' '}
          reviews
        </span>
      </span>
    </div>
  );
}

export default Stars;
