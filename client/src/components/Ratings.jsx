import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewEntry from './RatingsComp/ReviewEntry.jsx';
import ClipLoader from "react-spinners/ClipLoader";

function Ratings({ product, rating, setProduct }) {
  const [reviewList, setReviewList] = useState([]);
  const [sort, setSort] = useState('newest');
  const [count, setCount] = useState(0);
  const [totalReview, setTotalReviews] = useState('');
  const [reviewHolder, setReviewHolder] = useState([]);
  const [reviewDisplay, setReviewDisplay] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rating.product_id) {
      setTotalReviews(rating.recommended.true + rating.recommended.false);
    }
  }, [rating]);

  useEffect(() => {
    if (rating.product_id) {
      axios.get(`/db/reviews/${rating.product_id}/${sort}/${totalReview}/1`)
        .then((data) => { setReviewList(data.data.results); })
        .catch(() => console.log('error in obtaining review'));
      // setProduct({id: 40345})
    }
  }, [totalReview, sort]);

  useEffect(() => {
    if (reviewList[0]) {
      setReviewHolder(reviewList);
      // setCount(2);
    }
  }, [reviewList]);

  useEffect(() => {
    if (reviewHolder[0]) {
      setCount(2);
    }
  }, [reviewHolder]);

  useEffect(() => {
    if (reviewHolder[0] && count > 1) {
      setReviewDisplay(reviewHolder.slice(0, count));
      setLoading(false);
    }
  }, [count]);

  const moreHandler = (e) => {
    const addCount = count + 2;
    setCount(addCount);
  };
  const sortHelpful = (e) => {
    setLoading(true);
    setSort('helpful');
    setCount(0);
  };
  const sortRelevance = (e) => {
    setLoading(true);
    setSort('relevant');
    setCount(0);
  };
  const sortNewest = (e) => {
    setLoading(true);
    setSort('newest');
    setCount(0);
  };

  return (
    <div>
      RATINGS
      <ClipLoader
        color={'green'}
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {reviewDisplay.map((review) => {
        console.log(review);
        return (
          <ReviewEntry review={review} />
        );
      })}
      <br/>
      <button onClick={moreHandler}>more</button><br/>
      <button onClick={sortHelpful}>Sort based on helpful</button>
      <button onClick={sortRelevance}>Sort based on relevance</button>
      <button onClick={sortNewest}>Sort based on newest</button>
    </div>
  );
}

export default Ratings;
