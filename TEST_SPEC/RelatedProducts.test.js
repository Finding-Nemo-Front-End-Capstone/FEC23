import React from 'react';
import { act, cleanup, screen, render, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import ReactDOM from 'react-dom';
import RelatedProducts from '../client/src/components/RelatedOutfits/RelatedProducts.jsx';
import RelatedCards from '../client/src/components/RelatedOutfits/RelatedCards.jsx';
import Outfits from '../client/src/components/RelatedOutfits/Outfits.jsx';
import exData from './exampleData/exampleDataRelatedProducts.js';

jest.mock('axios');
beforeEach(jest.clearAllMocks);
describe('Related Products component', () => {
  test('Render the component fully', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: exData.knownRelated });
    axiosMock.spread.mockResolvedValueOnce( {data : exData.all40344});
    await act(async () => {
      render(<RelatedProducts id={exData.testId} product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
    });
    expect(axiosMock.get).toBeCalled();
    expect(axiosMock.spread).toBeCalled();
  });

  test('Should not have left arrow when at index 0', async () => {
    axiosMock.get.mockResolvedValueOnce( { data : exData.knownRelated });
    axiosMock.spread.mockResolvedValueOnce( { data : exData.all40344 })
    await act(async () => {
      render(<RelatedProducts id={exData.testId} product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
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
    axiosMock.get.mockResolvedValueOnce( { data: exData.knownRelated });
    axiosMock.spread.mockResolvedValueOnce( { data : exData.all40344 });

    await act(async () => {
      render(<RelatedProducts id={exData.testId} product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
    });
  })
});

const testRelInfo = exData.all40344[0];
describe('Related Cards component', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    })
  })

  test('Render the component along with modal', async () => {
    render(<RelatedCards relInfo={testRelInfo} product={exData.p40344} />)
    await userEvent.click(screen.getByText('⭐'));
  });

  test('Should show have empty image container when thumbnail is not provided', () => {
    testRelInfo.thumbnail = null;
    render(<RelatedCards relInfo={testRelInfo} product={exData.p40344}/>);
  });
});

describe('Outfits component', () => {
  test('Render the component correctly', async () => {
    const mockLocalStorage = jest.spyOn(Storage.prototype, "getItem");
    Storage.prototype.getItem = jest.fn();
    await act(async () => {
      await render(<Outfits product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344}/>);
    });
    expect(mockLocalStorage).not.toHaveBeenCalled();
  });

  test('Should not have left arrow when at index 0', async () => {
    await act(async() => {
      await render (<Outfits product={exData.p40344} rating = {exData.r40344} currStyle={exData.s40344} />);
    });
    expect(screen.queryByText('◀')).toBeNull();
    expect(screen.queryByText('▶')).toBeNull();
  });

  test('Should add current product when "Add to my outfits" is clicked', async() => {
    const mockLocalStorage = (function () {
      const store = {};
      return {
        getItem: function (key) {
          return store[key];
        },
        setItem: function (key, value) {
          store[key] = value.toString();
        },
        clear: function () {
          store = {};
        },
        removeItem: function(key) {
          delete store[key];
        }
      };
    })();
    mockLocalStorage.setItem('outfits', "[{\"id\":40346,\"category\":\"Pants\",\"name\":\"Morning Joggers\",\"price\":\"40.00\",\"rating\":{\"product_id\":\"40346\",\"ratings\":{\"1\":\"19\",\"2\":\"45\",\"3\":\"40\",\"4\":\"24\",\"5\":\"78\"},\"recommended\":{\"false\":\"59\",\"true\":\"147\"},\"characteristics\":{\"Fit\":{\"id\":135224,\"value\":\"2.5467625899280576\"},\"Length\":{\"id\":135225,\"value\":\"3.1096774193548387\"},\"Comfort\":{\"id\":135226,\"value\":\"2.9807692307692308\"},\"Quality\":{\"id\":135227,\"value\":\"3.3576158940397351\"}}},\"thumbnail\":\"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ix….1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\"}]")
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage});
    const jsonMock = jest.spyOn(localStorage, 'setItem');
    await act(async () => {
      await render (<Outfits product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
    });
    await userEvent.click( await screen.getByText(/Add to my outfits/i));
    expect(jsonMock).toHaveBeenCalled();
  });
});