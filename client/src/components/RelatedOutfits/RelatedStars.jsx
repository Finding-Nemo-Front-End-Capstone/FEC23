import React from 'react';

const RelatedStars = ({ rating }) => {
  let reviewCount = 0;
  let total = 0;
  if (rating.ratings) {
    for (let stars in rating.ratings) {
      reviewCount += Number(rating.ratings[stars]);
      total += (stars * rating.ratings[stars]);
    }
  }
  let avgRating = (Math.round(total / reviewCount * 4) / 4).toFixed(2);
  const percentage = avgRating / 5 * 100;

  if (rating.ratings) {
    return (
      <div>
      <span className="rating">
        <div className="rating-wrap">
          <span className="stars-active" style={{ width: `${percentage}%` }}>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
          </span>
          <span className="stars-inactive">
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
            <i className="fa fa-star-o" aria-hidden="true"></i>
          </span>
        </div>
      </span>
    </div>
    )
  }

}

export default RelatedStars;
