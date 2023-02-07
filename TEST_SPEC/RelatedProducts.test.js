import React from 'react';
import { act, cleanup, screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import RelatedProducts from '../client/src/components/RelatedOutfits/RelatedProducts.jsx';

jest.mock('axios');
beforeEach(jest.clearAllMocks);
const testId = 40344;
const knownRelated = [40345, 40346, 40351, 40350];
const testProd = {
  id: 40344,
  campus: 'hr-rfp',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  created_at: '2021-08-13T14:38:44.509Z',
  updated_at: '2021-08-13T14:38:44.509Z',
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas'
    },
    {
      feature: 'Buttons',
      value: 'Brass'
    }
  ]
};
const testRating = {
  product_id: '40344',
  ratings: {
    1: '100',
    2: '197',
    3: '305',
    4: '275',
    5: '634'
  }
};
const testStyle = {
  product_id: '40344',
  results: [
    {
      style_id: 240500,
      name: 'Forest Green & Black',
      original_price: '140.00',
      sale_price: null,
      'default?': true,
      photos: [
        { thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
        },
      ]
    }
  ]
};
const testAll = [
  {
    id: '40345',
    category: 'Accessories',
    name: 'Bright Future Sunglasses',
    price: '69.00',
    features: [
      {
        "feature": "Lenses",
        "value": "Ultrasheen"
      },
      {
        "feature": "UV Protection",
        "value": null
      },
      {
        "feature": "Frames",
        "value": "LightCompose"
    }
  ],
    rating: {
      "product_id": "40345",
      "ratings": {
          "1": "5",
          "2": "4",
          "3": "8",
          "4": "28",
          "5": "26"
      },
      "recommended": {
          "false": "27",
          "true": "44"
      },
      "characteristics": {
          "Quality": {
              "id": 135223,
              "value": "3.5208333333333333"
          }
      }
  },
    thumbnail: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
  }, {
    id: '40346',
    category: 'Pants',
    name: 'Morning Joggers',
    price: '40.00',
    features: [
      {
        "feature": "Fabric",
        "value": "100% Cotton"
      },
      {
          "feature": "Cut",
          "value": "Skinny"
      }
    ],
    rating: {
      "product_id": "40346",
      "ratings": {
          "1": "21",
          "2": "46",
          "3": "42",
          "4": "29",
          "5": "80"
      },
      "recommended": {
          "false": "61",
          "true": "157"
      },
      "characteristics": {
          "Fit": {
              "id": 135224,
              "value": "2.6092715231788079"
          },
          "Length": {
              "id": 135225,
              "value": "3.1317365269461078"
          },
          "Comfort": {
              "id": 135226,
              "value": "3.0059523809523810"
          },
          "Quality": {
              "id": 135227,
              "value": "3.3680981595092025"
          }
      }
  },
    thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  }, {
    id: '40351',
    category: 'Kicks',
    name: 'YEasy 350',
    features: [{
      "feature": "Sole",
      "value": "Rubber"
    },
    {
      "feature": "Material",
      "value": "FullControlSkin"
    },
    {
      "feature": "Stitching",
      "value": "Double Stitch"
    }],
    rating: {
      "product_id": "40351",
      "ratings": {
          "1": "16",
          "2": "8",
          "3": "32",
          "4": "9",
          "5": "69"
      },
      "recommended": {
          "false": "31",
          "true": "103"
      },
      "characteristics": {
          "Size": {
              "id": 135244,
              "value": "3.1666666666666667"
          },
          "Width": {
              "id": 135245,
              "value": "3.1219512195121951"
          },
          "Comfort": {
              "id": 135246,
              "value": "3.9878048780487805"
          },
          "Quality": {
              "id": 135247,
              "value": "4.1341463414634146"
          }
      }
  },
    thumbnail: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
  }, {
    id: '40350',
    category: 'Dress Shoes',
    name: 'Blues Suede Shoes',
    features: [
    {
      "feature": "Sole",
      "value": "Rubber"
    },
    {
        "feature": "Material",
        "value": "FullControlSkin"
    },
    {
        "feature": "Stitching",
        "value": "Double Stitch"
    }],
    rating: {
      "product_id": "40350",
      "ratings": {
          "1": "8",
          "2": "6",
          "3": "13",
          "4": "18",
          "5": "27"
      },
      "recommended": {
          "false": "24",
          "true": "48"
      },
      "characteristics": {
          "Size": {
              "id": 135240,
              "value": "2.7014925373134328"
          },
          "Width": {
              "id": 135241,
              "value": "2.8656716417910448"
          },
          "Comfort": {
              "id": 135242,
              "value": "3.1641791044776119"
          },
          "Quality": {
              "id": 135243,
              "value": "3.1363636363636364"
          }
      }
  },
    thumbnail: 'https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'
  }];
describe('Related Products should make calls', () => {
  test('Render the component fully', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: knownRelated });
    axiosMock.spread.mockResolvedValueOnce( {data : testAll});
    await act(async () => {
      render(<RelatedProducts id={testId} product={testProd} rating={testRating} currStyle={testStyle} />);
    });
    expect(axiosMock.get).toBeCalled();
    expect(axiosMock.spread).toBeCalled();
  });

  test('Should not have left arrow when at index 0', async () => {
    axiosMock.get.mockResolvedValueOnce( { data : knownRelated });
    axiosMock.spread.mockResolvedValueOnce( { data : testAll })
    await act(async () => {
      render(<RelatedProducts id={testId} product={testProd} rating={testRating} currStyle={testStyle} />);
    });
    expect(screen.queryByText('◀')).toBeNull();
    expect(screen.queryByText('▶')).toBeTruthy();

    await userEvent.click(await screen.findByRole('button', { name: '▶'}));

    expect(screen.queryByText('◀')).toBeTruthy();
    expect(screen.queryByText('▶')).toBeFalsy();
    // mock anything you need, render, etc.
    // const firstImage = await screen.findByAltText(relatedProduct[0].altText);
    // await userEvent.click(await screen.findByRole('button', { name: ' > ' });
    // expect(firstImage).not.toBeInTheDocument();
  });

  test('Should setDisplay on successful data', async() => {
    axiosMock.get.mockResolvedValueOnce( { data: knownRelated });
    axiosMock.spread.mockResolvedValueOnce( { data : testAll });

    await act(async () => {
      render(<RelatedProducts id={testId} product={testProd} rating={testRating} currStyle={testStyle} />);
    });
  })
});
