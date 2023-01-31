import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
// import adapter from axios +'/lib/adapters/http';

// import Ratings from '../client/src/components/Ratings.jsx';
import ReviewEntry from '../client/src/components/RatingsComp/ReviewEntry.jsx';
import serverTest from './utils.js';
// @jest-environment jsdom
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
    // const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
    // console.log('here', data.data)
    // expect(data.status).not.toBe(404 && 500);
    // 400 is for page not found, 500 is for not able to obtain the data
    const data = await allProducts();
    // console.log(data.status);
    // const data = await allProducts();
    // console.log('what is data', data);
    expect(data.status).toBe(200);
  });

  it('should receive the first product and obtain the review', async () => {
    const allProductsData = await allProducts();
    // const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
    // console.log('here', allProductsData);
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
