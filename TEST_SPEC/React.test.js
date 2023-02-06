/* eslint-disable prefer-destructuring */
import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
// import adapter from axios +'/lib/adapters/http';

// import Ratings from '../client/src/components/Ratings.jsx';
import ReviewEntry from '../client/src/components/RatingsComp/ReviewEntry.jsx';
// import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import serverTest from './utils.js';
// @jest-environment jsdom

import RelatedProducts from '../client/src/components/RelatedOutfits/RelatedProducts.jsx';

const allProducts = serverTest.allProducts;
const reviews = serverTest.reviews;

const ReviewObjTest = {
  rating: 5,
  summary: 'summary test',
  recommend: true,
  response: null,
  body: 'body test',
  date: '2023-01-30T00:00:00.000Z',
  helpfulness: 30,
  photos: [{ url: 'https://picsum.photos/id/237/200/300' }],
  reviewer_name: 'test',
};

describe('Ratings & Reviews', () => {
  it('should show rating on based on the data that was received', () => {
    const { getByTestId } = render(<ReviewEntry review={ReviewObjTest} />);
    const rating = getByTestId('ratingReview').textContent;
    expect(rating).toEqual('5');
  });
});

describe('SERVER', () => {
  test('should receive all products', async () => {
    const data = await allProducts();
    expect(data.status).toBe(200);
  });

  it('should receive the first product and obtain the review', async () => {
    const allProductsData = await allProducts();
    const firstProduct = await allProductsData.data[0].id;
    const reviewsData = await reviews(firstProduct);
    expect(reviewsData.status).toBe(200);
  });

  // it('should obtain the meta from the first product', async () => {
  //   const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
  //   const firstProduct = data.data[0].id;
  //   const reviews = await axios.get(`http://localhost:${process.env.PORT}/db/meta/${firstProduct}`);
  //   it(reviews.status).not.toBe(404 && 500);
  // });
});

describe ('Related Products', () => {
  afterEach(cleanup);
  it('should get list of related products based on the current product', async () => {
    const knownRelated = [40345, 40346, 40351, 40350];
    let getRelated = [];
    axios.get(`/db/related/${40344}`)
      .then((data) => {
        getRelated = data.data;
        expect(JSON.stringify(knownRelated)).toBe(JSON.stringify(getRelated));
      })
      .catch((err) => console.log('failed get request', err));
  });

  it('should get a snapshot of the component', async() => {
    const { product_40334 } = render(<RelatedProducts id={40344} product={} rating={} currStyle={}/>)
  })
})

// describe ('Overview - Styles', () => {
//   it('should get list of styles based on the current product', async () => {
//     const knownStyles = [240500, 240501, 240502, 240503, 240504, 240505];
//     let getStyles = [];
//     axios.get(`/db/styles/${40344}`)
//       .then((data) => {
//         for (var i = 0; i < data.data.results.length; i++) {
//           getStyles.push(data.data.results[i].style_id)
//         }
//         expect(JSON.stringify(knownStyles)).toBe(JSON.stringify(getStyles));
//       })
//       .catch((err) => console.log('failed get request', err));
//   });
// })
// describe ('Questions and Answers', () => {
//   it('intially render up to four questions', async () => {
//     let getRelated = [];
//     axios.get(`/db/questions?product_id=40344&page=1&count=100`)
//       .then((data) => {
//         getRelated = data.data;
//         expect(JSON.stringify(knownRelated)).toBe(JSON.stringify(getRelated));
//       })
//       .catch((err) => console.log('failed get request', err));
//   });
// })
