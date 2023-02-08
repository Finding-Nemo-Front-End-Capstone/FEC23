import React from 'react';
import { act, cleanup, screen, render, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import ReactDOM from 'react-dom';
import RelatedProducts from '../client/src/components/RelatedOutfits/RelatedProducts.jsx';
import RelatedCards from '../client/src/components/RelatedOutfits/RelatedCards.jsx';
import Outfits from '../client/src/components/RelatedOutfits/Outfits.jsx';
import OutfitCards from '../client/src/components/RelatedOutfits/OutfitCards.jsx';
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

  test('Should not have left arrow when at index 0 for Related container', async () => {
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
    await userEvent.click(await screen.findByRole('button', { name: '◀'}));
    expect(screen.queryByText('◀')).toBeFalsy();
    expect(screen.queryByText('▶')).toBeTruthy();
    // mock anything you need, render, etc.
    // const firstImage = await screen.findByAltText(relatedProduct[0].altText);
    // await userEvent.click(await screen.findByRole('button', { name: ' > ' });
    // expect(firstImage).not.toBeInTheDocument();
  });
  test('Should console.log when axios.get fails', async() => {
    axiosMock.get.mockRejectedValueOnce();
    const failSpy = jest.spyOn(console, 'log');
    await act (async () => {
      render (<RelatedProducts id={exData.testId} product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
    });
    expect(failSpy).toHaveBeenCalled();
  })
  test('Should setDisplay on successful data', async() => {
    axiosMock.get.mockResolvedValueOnce( { data: exData.knownRelated });
    axiosMock.spread.mockResolvedValueOnce( { data : exData.all40344 });

    await act(async () => {
      render(<RelatedProducts id={exData.testId} product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
    });
  })
});

describe('Related Cards component', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    })
  })

  test('Render the component along with modal', async () => {
    render(<RelatedCards relInfo={exData.all40344[0]} product={exData.p40344} />)
    await userEvent.click(screen.getByText('⭐'));
  });

  test('Should show have empty image container when thumbnail is not provided', () => {
    exData.all40344[0].thumbnail = null;
    render(<RelatedCards relInfo={exData.all40344[0]} product={exData.p40344}/>);
  });

  test('Should fire clickNav when cardDetails is clicked', async() => {
    const setMock = jest.fn();
    render(<RelatedCards relInfo={exData.all40344[0]} product={exData.p40344} setProduct={setMock} />);
    await userEvent.click(screen.getByTestId('cardDetails'));
    expect (setMock).toHaveBeenCalled();
  })
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

  test('Should not have arrow buttons when Outfits container has less than 3 items', async () => {
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
    mockLocalStorage.setItem('outfits', `[${exData.string40345}, ${exData.string40346}, ${exData.string40350}, ${exData.string40351} ]`)
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    const jsonMock = jest.spyOn(localStorage, 'setItem');
    await act(async () => {
      await render (<Outfits product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
    });
    await userEvent.click( await screen.getByText(/Add to my outfits/i));
    expect(jsonMock).toHaveBeenCalled();
  });

  test('Should call arrowClick when multiple items are stored in outfits', async () => {
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
    mockLocalStorage.setItem('outfits', `[${exData.string40345}, ${exData.string40346}, ${exData.string40350}, ${exData.string40351}]`);
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    await act(async() => {
      render( <Outfits product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />) });
    await userEvent.click( await screen.findByRole('button', { name: '>' }) );
    await userEvent.click( await screen.findByRole('button', { name: '<'}) );
    // expect(screen.findByRole('button', {name: '>'})).toBeInTheDocument();
    // expect(screen.findByRole('button', {name: '<'})).not.toBeInTheDocument();
  });

  describe('OutfitCards component', () => {
    test('Render the component correctly', async() => {
      await act(async () => {
        await render(<OutfitCards product={exData.p40344} saved={localStorage}/>)
      });
    });

    test('Should render img without a thumbnail', async() => {
      let alteredExData = JSON.parse(exData.string40344);
      alteredExData.thumbnail = null;
      await act(async () => {
        await render(<OutfitCards product={alteredExData} saved={localStorage}/>)
      });
    });

    test('Should remove a product when clicking X', async() => {
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
      mockLocalStorage.setItem('outfits', [exData.string40344]);
      Object.defineProperty(window, 'localStorage', { value : mockLocalStorage });
      const jsonMock = jest.spyOn(localStorage, 'getItem');
      await act(async () => {
        await render (<Outfits product={exData.p40344} rating={exData.r40344} currStyle={exData.s40344} />);
      });
      await userEvent.click( await screen.getAllByText(/✖/i)[0]);
      expect(jsonMock).toHaveBeenCalled();
    })
  });
});