/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const axios = require('axios');
const functions = require('./function');

// import 'react-native';
// import React from 'react';
// import { shallow } from 'enzyme';
// import axios from 'axios';
// import functions from './function.js'
describe('to see whether jest-test is working', () => {
  test('add 2 + 2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
  });
});

// endPoint

describe('SERVER', () => {
  test('should receive all products', async () => {
    const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
    // console.log('here', data.data)
    expect(data.status).not.toBe(404 && 500);
    // 400 is for page not found, 500 is for not able to obtain the data
  });

  test('should receive the first product and obtain the review', async () => {
    const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
    const firstProduct = data.data[0].id;
    const reviews = await axios.get(`http://localhost:${process.env.PORT}/db/reviews/${firstProduct}/newest/1/1`);
    expect(reviews.status).not.toBe(404 && 500);
  });

  test('should obtain the meta from the first product', async () => {
    const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
    const firstProduct = data.data[0].id;
    const reviews = await axios.get(`http://localhost:${process.env.PORT}/db/meta/${firstProduct}`);
    expect(reviews.status).not.toBe(404 && 500);
  });
});