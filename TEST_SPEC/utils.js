import axios from 'axios';

const serverTest = {
  allProducts: async () => {
    const allProductsURL = `http://localhost:${process.env.PORT}/db/allProducts`;
    try {
      return await axios.get(`${allProductsURL}`);
    } catch (e) {
      return [];
    }
  },
  reviews: async (product) => {
    const reviewsURL = `http://localhost:${process.env.PORT}/db/reviews/${product}/newest/1/1`;
    try {
      return await axios.get(`${reviewsURL}`);
    } catch (e) {
      return [];
    }
  },
  related: async (product) => {
    const relatedURL = `http://localhost:${process.env.PORT}/db/related/${product}`;
    try {
      return await axios.get(`${relatedURL}`);
    } catch (e) {
      return [];
    }
  },

};

export default serverTest;
