import React from 'react';
import { screen, act, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

import Overview from '../client/src/components/Overview/Overview.jsx';
import Gallery from '../client/src/components/Overview/Gallery.jsx';
import Stars from '../client/src/components/Overview/Stars.jsx';
import Price from '../client/src/components/Overview/Price.jsx';
import Styles from '../client/src/components/Overview/Styles.jsx';
import CartForm from '../client/src/components/Overview/CartForm.jsx';
import Social from '../client/src/components/Overview/Social.jsx';
import serverTest from './utils.js';
import exData from './exampleData/OverviewExampleData.js';

const { allProducts } = serverTest;
jest.mock('axios');
beforeEach(jest.clearAllMocks);

describe('Overview', () => {
  it('should console.log an error for axios.get failure', async () => {
    axiosMock.get.mockRejectedValueOnce();
    const failSpy = jest.spyOn(console, 'log');
    await act(async () => {
      await render(<Overview product={exData.p40344} rating={exData.r40344} currPhotoIndex={0} />);
    });
    expect(failSpy).toHaveBeenCalled();
  });

  it('should show the total reviews for className="rating"', async () => {
    const { queryByText } = render(<Stars rating={exData.ratingData} />);
    expect(queryByText(/71/i)).toBeInTheDocument();
  });

  it('should show the STYLE', async () => {
    const { queryByText } = render(<Styles styles={exData.s40344['results']} currStyle={exData.s40344['results'][0]} />);
    expect(queryByText(/STYLE/i)).toBeInTheDocument();
  });

  it('should setState onClick', async () => {
    const setStateMock = jest.fn();
    await act(async () => {
      await render(<Styles styles={exData.s40344['results']} currStyle={exData.s40344['results'][0]} setCurrStyle={setStateMock} />);
    });
    await userEvent.click(screen.getAllByTestId('style')[0]);
    expect(setStateMock).toHaveBeenCalled();
  });

  it('should have a zoom-in cursor on main img hover', async () => {
    const { getByTestId, container } = render(<Gallery currStyle={exData.s40344['results'][0]} currPhotoIndex={'0'} />);
    // fireEvent.mouseEnter(getByTestId('main'));
    // expect(getByTestId('main')).toHaveStyle('cursor: zoom-in');
  });

  it('should have a price of $140.00', async () => {
    const { queryByText } = render(<Price currStyle={exData.s40344['results'][0]} />);
    expect(queryByText(/140.00/i)).toBeInTheDocument();
  });

  it('should have a price of $140.00', async () => {
    const { queryByText } = render(<Price currStyle={exData.s40344['results'][1]} />);
    expect(queryByText(/100.00/i)).toBeInTheDocument();
  });

  it('should render cart form', async () => {
    await act(async () => {
      await render(<CartForm currStyle={exData.s40344['results'][0]} />);
    });
  });

  it('should set state on select', async () => {
    await act(async () => {
      await render(<CartForm currStyle={exData.s40344['results'][0]} />);
    });
    await userEvent.click(screen.getByTestId('select-size'));
    await userEvent.click(screen.getByTestId('size'));
    expect(screen.queryByText(/XS/i)).toBeInTheDocument();
  });

  it('should fail post request on add to bag', async () => {
    axiosMock.post.mockRejectedValueOnce();
    const failSpy = jest.spyOn(console, 'log');
    await act(async () => {
      await render(<CartForm currStyle={exData.s40344['results'][0]} />);
    });
    screen.debug();
    await userEvent.click(await screen.findByRole('button', { name: 'ADD TO BAG' }) );
    expect(failSpy).toHaveBeenCalled();
  });

  it('should have successful post request on add to bag', async () => {
    axiosMock.post.mockResolvedValueOnce();
    const passSpy = jest.spyOn(console, 'log');
    await act(async () => {
      await render(<CartForm currStyle={exData.s40344['results'][0]} />);
    });
    await userEvent.click(await screen.getByTestId('select-size'));
    await userEvent.click(await screen.getAllByTestId('size')[0]);
    await userEvent.click(await screen.getByTestId('bag'));
    // await userEvent.click(await screen.findByRole('button', { name: 'ADD TO BAG' }) );
    screen.debug();
    expect(passSpy).toHaveBeenCalled();
  });

  it('should render Social icons', async () => {
    await act(async () => {
      await render(<Social />);
    });
  });
  // it('should show SELECT SIZE before size is selected', async () => {
  //   const { queryByText } = render(<CartForm currStyle={exData.s40344['results'][1]} />);
  //   expect(queryByText(/SELECT SIZE/i)).toBeInTheDocument();
  // });



});












// it('should get list of styles based on the current product', async () => {
//   const knownStyles = [240500, 240501, 240502, 240503, 240504, 240505];
//   const getStyles = [];
//   axios.get(`/db/styles/${40344}`)
//     .then((data) => {
//       for (let i = 0; i < data.data.results.length; i++) {
//         getStyles.push(data.data.results[i].style_id);
//       }
//       expect(JSON.stringify(knownStyles)).toBe(JSON.stringify(getStyles));
//     })
//     .catch((err) => console.log('failed get request', err));
// });