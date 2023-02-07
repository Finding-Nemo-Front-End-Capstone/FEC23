import React from 'react';
import renderer, {
  screen, act, render, fireEvent, waitFor,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
// import adapter from axios +'/lib/adapters/http';

// import Ratings from '../client/src/components/Ratings.jsx';
import Ratings from '../client/src/components/Ratings';
import ReviewEntry from '../client/src/components/RatingsComp/ReviewEntry.jsx';
import Breakdown from '../client/src/components/RatingsComp/Breakdown.jsx';
import ChacBreak from '../client/src/components/RatingsComp/ChacBreak.jsx';
// import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import serverTest from './utils.js';
// @jest-environment jsdom

// import RelatedProducts from '../client/src/components/RelatedOutfits/RelatedProducts.jsx';

const { allProducts } = serverTest;
const { reviews } = serverTest;

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

const RatingData = {
  characteristics: {
    Comfort: {
      id: 135226,
      value: '3.0059523809523810',
    },
    Fit: {
      id: 135224,
      value: '2.6092715231788079',
    },
    Length: {
      id: 135225,
      value: '3.1317365269461078',
    },
    Quality: {
      id: 135227,
      value: '3.3680981595092025',
    },
  },
  product_id: '40346',
  ratings: {
    1: '21',
    2: '46',
    3: '42',
    4: '29',
    5: '80',
  },
  recommended: {
    false: '61',
    true: '157',
  },
};

function arrow(value) {
  const percentage = ((Number(value) / 5) * 100) - 1;
  return `${JSON.stringify(percentage)}%`;
}

describe('Ratings & Reviews', () => {
  it('should show the average rating for className="reviewAvgRating"', async () => {
    const { getByText } = render(<Breakdown rating={RatingData} />);
    expect(getByText('3.50')).toBeInTheDocument();
  });

  it('should show total number of 5 star', async () => {
    const { getByText } = render(<Breakdown rating={RatingData} />);
    expect(getByText('80')).toBeInTheDocument();
  });

  it('should show total number of 4 star', async () => {
    const { getByText } = render(<Breakdown rating={RatingData} />);
    expect(getByText('29')).toBeInTheDocument();
  });

  it('should show total number of 3 star', async () => {
    const { getByText } = render(<Breakdown rating={RatingData} />);
    expect(getByText('42')).toBeInTheDocument();
  });

  it('should show total number of 2 star', async () => {
    const { getByText } = render(<Breakdown rating={RatingData} />);
    expect(getByText('46')).toBeInTheDocument();
  });

  it('should show total number of 1 star', async () => {
    const { getByText } = render(<Breakdown rating={RatingData} />);
    expect(getByText('21')).toBeInTheDocument();
  });

  it('should show comfort breakdown bar', async () => {
    const { getByText } = render(<ChacBreak rating={RatingData} />);
    expect(getByText('Comfort:')).toBeVisible();
  });

  it('should show quality breakdown bar', async () => {
    const { getByText } = render(<ChacBreak rating={RatingData} />);
    expect(getByText('Quality:')).toBeVisible();
  });

  it('should show length breakdown bar', async () => {
    const { getByText } = render(<ChacBreak rating={RatingData} />);
    expect(getByText('Length:')).toBeVisible();
  });

  it('should show fit breakdown bar', async () => {
    const { getByText } = render(<ChacBreak rating={RatingData} />);
    expect(getByText('Fit:')).toBeVisible();
  });

  it('should NOT show Size breakdown bar', async () => {
    const { getByText } = render(<ChacBreak rating={RatingData} />);
    expect(getByText('Size:')).not.toBeVisible();
  });

  it('should NOT show Width breakdown bar', async () => {
    const { getByText } = render(<ChacBreak rating={RatingData} />);
    expect(getByText('Width:')).not.toBeVisible();
  });

  it('should have arrow-quality to be positioned in specific position on the graph', async () => {
    const { getByTestId } = render(<ChacBreak rating={RatingData} />);
    const data = arrow(RatingData.characteristics.Quality.value);
    expect(getByTestId('arrow-quality')).toHaveStyle(`margin-left:${data}`);
  });

  it('should have arrow-comfort to be positioned in specific position on the graph', async () => {
    const { getByTestId } = render(<ChacBreak rating={RatingData} />);
    const data = arrow(RatingData.characteristics.Comfort.value);
    expect(getByTestId('arrow-comfort')).toHaveStyle(`margin-left:${data}`);
  });

  it('should have arrow-length to be positioned in specific position on the graph', async () => {
    const { getByTestId } = render(<ChacBreak rating={RatingData} />);
    const data = arrow(RatingData.characteristics.Length.value);
    expect(getByTestId('arrow-length')).toHaveStyle(`margin-left:${data}`);
  });

  it('should have arrow-fit to be positioned in specific position on the graph', async () => {
    const { getByTestId } = render(<ChacBreak rating={RatingData} />);
    const data = arrow(RatingData.characteristics.Fit.value);
    expect(getByTestId('arrow-fit')).toHaveStyle(`margin-left:${data}`);
  });

  it('should turn the bar to purple on mouseEnter', async () => {
    const { getByTestId, container } = render(<Breakdown rating={RatingData} />);
    fireEvent.mouseEnter(getByTestId('bar-1'));
    expect(getByTestId('bar-1')).toHaveStyle('background-color:purple');
  });

  it('should turn the bar to original color on mouseLeave', async () => {
    const { getByTestId, container } = render(<Breakdown rating={RatingData} />);
    fireEvent.mouseEnter(getByTestId('bar-1'));
    fireEvent.mouseLeave(getByTestId('bar-1'));
    expect(getByTestId('bar-1')).toHaveStyle('background-color:');
  });

  it('should turn the bar to yellow color on click', async () => {
    const { getByTestId, container } = render(<Ratings rating={RatingData} />);
    fireEvent.mouseEnter(getByTestId('bar-1'));
    fireEvent.click(getByTestId('bar-1'));
    fireEvent.mouseLeave(getByTestId('bar-1'));
    expect(getByTestId('bar-1')).toHaveStyle('background-color: orange');
  });

  it('should turn the bar to original color when rating filter is reset on click', async () => {
    const { getByTestId, container, getByText } = render(<Ratings rating={RatingData} />);
    fireEvent.mouseEnter(getByTestId('bar-1'));
    fireEvent.click(getByTestId('bar-1'));
    fireEvent.mouseLeave(getByTestId('bar-1'));
    fireEvent.click(getByText('Show all rating'));
    expect(getByTestId('bar-1')).toHaveStyle('background-color:');
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

  it('should obtain the meta from the first product', async () => {
    const data = await axios.get(`http://localhost:${process.env.PORT}/db/allProducts`);
    const firstProduct = data.data[0].id;
    const reviews = await axios.get(`http://localhost:${process.env.PORT}/db/meta/${firstProduct}`);
    expect(reviews.status).not.toBe(404 && 500);
  });
});

describe('Related Products', () => {
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
});

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
