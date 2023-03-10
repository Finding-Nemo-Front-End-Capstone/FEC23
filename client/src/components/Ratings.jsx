/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader.js';
import ReviewEntry from './RatingsComp/ReviewEntry.jsx';
import ReviewForm from './RatingsComp/ReviewForm.jsx';
import Breakdown from './RatingsComp/Breakdown.jsx';
import ChacBreak from './RatingsComp/ChacBreak.jsx';
import {ClickContext} from '../index.jsx'

function Ratings({
  product, rating, setProduct, invoke, setInvoke,
}) {
  // const {clicks, handleClick} = useContext(ClickContext);
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

  let countTest = 0;

  useEffect(() => {
    // console.log('this is RATING', rating);
    if (!containFilter[0]) {
      console.log('reviewist', reviewList);
      setReviewHolder(reviewList);
      setCount(0);
    } else {
      const arr = reviewList.filter((reviewFilter) => {
        if (containFilter.indexOf(reviewFilter.rating) !== -1) {
          return true;
        }
        return false;
      });
      setReviewHolder(arr);
      setCount(0);
    }
  }, [containFilter]);

  useEffect(() => {
    // console.log('this is rating', rating);
    if (rating.product_id) {
      setTotalReviews(rating.recommended.true + rating.recommended.false);
      axios.get(`/db/reviews/${rating.product_id}/${sort}/${rating.recommended.true + rating.recommended.false}/1`)
        .then((data) => {
          console.log('HOHO', data);
          if (sort === 'newest') {
            setReviewList(
              data.data.results.sort((a, b) => b.review_id - a.review_id),
            );
          } else {
            setReviewList(data.data.results);
          }
        })
        .catch(() => console.log('error in obtaining review'));
    }
  }, [rating, sort]);

  // useEffect(() => {
  //   if (rating.product_id) {
  //     console.log(totalReview);
  //     if (totalReview !== rating.recommended.true + rating.recommended.false) {
  //       axios.get(`/db/reviews/${rating.product_id}/${sort}/${totalReview}/1`)
  //         .then((data) => {
  //           console.log('Ineedthe form of this', data);
  //           if (sort === 'newest') {
  //             setReviewList(
  //               data.data.results.sort((a, b) => b.review_id - a.review_id),
  //             );
  //           } else {
  //             setReviewList(data.data.results);
  //           }
  //         })
  //         .catch(() => console.log('error in obtaining review'));
  //     }
  //   }
  // }, [totalReview, sort]);

  useEffect(() => {
    if (reviewList[0]) {
      console.log('this is reviewlist', reviewList);
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
    // console.log('this is context', clicks)
    // handleClick(e.target.id)
    const addCount = count + 2;
    setCount(addCount);
    if (addCount >= reviewHolder.length) {
      setMoreDisplay('none');
    }
  };

  const sortChange = (e) => {
    // handleClick()
    setLoading(true);
    setSort(e.target.value);
    setCount(0);
  };

  const reviewFormBut = (e) => {
    // handleClick()
    setReviewForm(!reviewForm);
  };

  const reviewFilter = (value) => {
    if (value === 'all') {
      setContainFilter([]);
      setCount(0);
    } else {
      value = Number(value);
      const index = containFilter.indexOf(value);
      if (index === -1) {
        const result1 = containFilter.slice();
        result1.push(value);
        setContainFilter(result1);
      } else {
        const arr1 = containFilter.slice(0, index);
        const arr2 = containFilter.slice(index + 1, containFilter.length);
        const result2 = arr1.concat(arr2);
        setContainFilter(result2);
      }
    }
  };

  return (
    <div className="RatingsReview" >
      <text className="RatingsReview">RATINGS & REVIEWS</text>
      <div className="chacandbreak">
        <Breakdown rating={rating} reviewFilter={reviewFilter} totalReview={totalReview} />
        <ChacBreak rating={rating} />
      </div>
      <div className="divReviewEntry">

        <div className="reviewHeader">
          <div className="dropdown">
            <label htmlFor="sort">
              Sort By:
              <select data-testid="sort" name="sort" id="sort" onChange={sortChange} value={sort}>
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
          <div className="divMapReview" data-testid="divMapReview">
            {reviewDisplay.map((review) => {
              countTest++;
              return (
                <ReviewEntry review={review} moreTestid={countTest} />
              );
            })}
            <button className="moreReviewBut" onClick={moreHandler} style={{ display: moreDisplay }}>More Reviews</button>
            <button className="writeReview" onClick={reviewFormBut}>Write Review</button>
            <div className="hello">{' '}</div>
          </div>
        </div>
      </div>
      <br />
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
            invoke={invoke}
            setInvoke={setInvoke}
          />
        </div>
      </div>
      )}
    </div>
  );
}

export default Ratings;
