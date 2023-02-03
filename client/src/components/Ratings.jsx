/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader.js';
import ReviewEntry from './RatingsComp/ReviewEntry.jsx';
import ReviewForm from './RatingsComp/ReviewForm.jsx';
import Breakdown from './RatingsComp/Breakdown.jsx'

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
  const [containFilter, setContainFilter] = useState([]);

  useEffect(() => {
    if (!containFilter[0]) {
      setReviewHolder(reviewList);
      setCount(0);
    } else {
      const arr = reviewList.filter((reviewFilter) => {
        if (containFilter.indexOf(reviewFilter.rating) !== -1) {
          return true
        }
        return false
      });
      setReviewHolder(arr);
      setCount(0);
    }
  }, [containFilter])

  useEffect(() => {
    console.log('this is rating', rating);
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
      setCount(0);
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

  const reviewFilter = (value) => {
    value = Number(value);
    const index = containFilter.indexOf(value)
    if (index === -1) {
      const result1 = containFilter.slice();
      result1.push(value);
      setContainFilter(result1);
    } else {
      const arr1 = containFilter.slice(0,index);
      const arr2 = containFilter.slice(index + 1, containFilter.length);
      const result2 = arr1.concat(arr2);
      setContainFilter(result2)
    }
    // if (value === 'all') {
    //   setReviewHolder(reviewList);
    //   setCount(0);
    // } else {
    //   const arr = reviewList.filter((reviewFilter) => {
    //     if (reviewFilter.rating === Number(value)) {
    //       return true;
    //     }
    //     return false;
    //   });
    //   console.log(value)
    //   setReviewHolder(arr);
    //   setCount(0);
    // }
  };

  return (
    <div>
      RATINGS
      <Breakdown rating={rating} reviewFilter={reviewFilter}/>
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
          <select name="sort" id="sort" onChange={sortChange} value={sort}>
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
      <button className="moreReviewBut" onClick={moreHandler} style={{ display: moreDisplay }}>More Reviews</button>
      <br />
      <button className="writeReview" onClick={reviewFormBut}>Write Review</button>

      {reviewForm
      && (
      <div className="reviewForm">
        <div className="overlay">
          <button className="closeReviewForm" onClick={reviewFormBut}>x</button>
          <ReviewForm
            rating={rating}
            setReviewForm={setReviewForm}
            totalReview={totalReview}
            setTotalReviews={setTotalReviews}
            setSort={setSort}
          />
        </div>
      </div>
      )}
    </div>
  );
}

export default Ratings;
