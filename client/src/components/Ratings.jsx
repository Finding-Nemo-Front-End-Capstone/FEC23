/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader.js';
import ReviewEntry from './RatingsComp/ReviewEntry.jsx';
import ReviewForm from './RatingsComp/ReviewForm.jsx';

function Ratings({ product, rating, setProduct }) {
  const [reviewList, setReviewList] = useState([]);
  const [sort, setSort] = useState('newest');
  const [count, setCount] = useState(0);
  const [totalReview, setTotalReviews] = useState('');
  const [reviewHolder, setReviewHolder] = useState([]);
  const [reviewDisplay, setReviewDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreDisplay, setMoreDisplay] = useState('none');
  const [reviewForm, setReviewForm] = useState(false);

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
      if (reviewHolder.length > 2) {
        setMoreDisplay('');
      }
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
    if (addCount >= reviewHolder.length) {
      setMoreDisplay('none');
    }
  };

  const sortChange = (e) => {
    setLoading(true);
    setSort(e.target.value);
    setCount(0);
  };

  const reviewFormBut = (e) => {
    setReviewForm(!reviewForm);
  };

  const reviewFilter = (e) => {
    if (e.target.value === 'all') {
      setReviewHolder(reviewList);
      setCount(0);
    } else {
      const arr = reviewList.filter((reviewFilter) => {
        if (reviewFilter.rating === Number(e.target.value)) {
          return true;
        }
        return false;
      });
      setReviewHolder(arr);
      setCount(0);
    }
  };

  return (
    <div>
      RATINGS
      <div className="reviewFilter">
        <label>
          Filter Rating:
          <button onClick={reviewFilter} value="all">All</button>
          <button onClick={reviewFilter} value="5">5</button>
          <button onClick={reviewFilter} value="4">4</button>
          <button onClick={reviewFilter} value="3">3</button>
          <button onClick={reviewFilter} value="2">2</button>
          <button onClick={reviewFilter} value="1">1</button>
        </label>
      </div>
      <div className="dropdown">
        <label htmlFor="sort">
          Sort By:
          <select name="sort" id="sort" onChange={sortChange}>
            <option value="newest">Newest</option>
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
          </select>
        </label>
      </div>
      <ClipLoader
        color="green"
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {reviewDisplay.map((review) => (
        <ReviewEntry review={review} />
      ))}
      <br />
      <button className='moreReviewBut' onClick={moreHandler} style={{ display: moreDisplay }}>More Reviews</button>
      <br/>
      <button className="writeReview" onClick={reviewFormBut}>Write Review</button>

      {reviewForm
      && (
      <div className="reviewForm">
        <div className='overlay'>
        <button className="closeReviewForm" onClick={reviewFormBut}>x</button>
        <ReviewForm />
        </div>
      </div>
      )}
    </div>
  );
}

export default Ratings;
