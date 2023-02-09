import React from 'react';
import renderer, {
  screen, act, render, fireEvent, waitFor,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

// import adapter from axios +'/lib/adapters/http';

// import Ratings from '../client/src/components/Ratings.jsx';
import Ratings from '../client/src/components/Ratings.jsx';
import ReviewEntry from '../client/src/components/RatingsComp/ReviewEntry.jsx';
import Breakdown from '../client/src/components/RatingsComp/Breakdown.jsx';
import ChacBreak from '../client/src/components/RatingsComp/ChacBreak.jsx';
// import QuestionList from '../client/src/components/Questions/QuestionList.jsx';
import serverTest from './utils.js';

jest.mock('axios');
// beforeEach(jest.clearAllMocks);

const dataResult = [
  {
    review_id: 4,
    rating: 4,
    summary: 'asdf4',
    recommend: true,
    response: ['hi this is admin'],
    reviewer_name: '4',
    photos: [],
    body: 'asdfa;lsdkflaksdlfklaskdlfkslkdlfklskdflksldkfdlfk',
    date: '2023-02-07T00:00:00.000Z',
    helpfulness: 4,
    verify: true,
  },
  {
    review_id: 3,
    rating: 3,
    summary: 'asdf3',
    recommend: false,
    response: ['hi this is admin'],
    reviewer_name: '3',
    photos: ['a'],
    body: 'asdfa;lsdkflaksdlfklaskdlfkslkdlfklskdflksldkfdlfk',
    date: '2023-02-07T00:00:00.000Z',
  },
  {
    review_id: 2,
    rating: 2,
    summary: 'asdf2',
    recommend: false,
    response: ['hi this is admin'],
    reviewer_name: '2',
    photos: [],
    body: 'asdfa;lsdkflaksdlfklaskdlfkasdfkasdkfjkasdjfkjaskdlfjlaksdjflkajsdflkajsdfkljaksdjflkajsdflajsdklfjalksdjfklajsdkfjslkdlfklskdflksldkfdlsdfnmansdf,mansdf,mansdmfn,asndfkasdlfkjaksdjfkjaskdjfkajsdkfjaksjdfkjaksdfjkajsdfjaksdjfkjasdjfasdjfalsdfasjdffkkasdkfjkajsdkfjalsjdfkjasdkjflajsdlfaksdjfkjasldfjaksdjfasdflasdjflaksdf',
    date: '2023-02-07T00:00:00.000Z',
  },
  {
    review_id: 1,
    rating: 1,
    summary: 'asdf1',
    recommend: true,
    response: ['hi this is admin'],
    reviewer_name: '1',
    photos: [],
    body: 'asdfa;lsdkflaksdlfklaskdlfkslkdlfklskdflksldkfdlfk',
    date: '2023-02-07T00:00:00.000Z',
  }];

const mockData = {
  data: {
    results: dataResult,
  },
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
    false: 61,
    true: 157,
  },
};

describe('Review Entry', () => {
  test('should show all comp through data pass', async () => {
    axiosMock.get.mockResolvedValueOnce(mockData);
    // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
    await act(async () => {
      render(<Ratings rating={RatingData} />);
    });
    expect(axiosMock.get).toBeCalled();
    expect(screen.queryByText(/asdf4/i)).toBeVisible();
  });

  test('should show all comp through data pass', async () => {
    axiosMock.get.mockResolvedValueOnce(mockData);
    // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
    await act(async () => {
      render(<Ratings rating={RatingData} />);
    });
    fireEvent.click(screen.queryByText('More Reviews'));
    fireEvent.click(screen.queryByTestId('more3'));
    expect(axiosMock.get).toBeCalled();
    // expect(screen.queryByText(/asdf1/i)).toBeVisible();
    expect(screen.queryByText(dataResult[2].body)).toBeVisible();
  });

  test('should show all comp through data pass', async () => {
    axiosMock.get.mockResolvedValueOnce(mockData);
    // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
    await act(async () => {
      render(<Ratings rating={RatingData} />);
    });
    fireEvent.click(screen.queryByText('More Reviews'));
    fireEvent.click(screen.queryByTestId('more3'));
    expect(axiosMock.get).toBeCalled();
    // expect(screen.queryByText(/asdf1/i)).toBeVisible();
    expect(screen.queryByText(dataResult[2].body)).toBeVisible();
    expect(screen.queryByTestId('verify1')).toBeVisible();
    expect(screen.queryByTestId('recommend2')).not.toBeVisible();
  });

  test('should show all comp through data pass', async () => {
    axiosMock.get.mockResolvedValueOnce(mockData);
    // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
    await act(async () => {
      render(<Ratings rating={RatingData} />);
    });
    fireEvent.click(screen.queryByText('More Reviews'));
    fireEvent.click(screen.queryByTestId('more3'));
    fireEvent.click(screen.queryByTestId('thumbdown1'));
    expect(axiosMock.get).toBeCalled();
    // expect(screen.queryByText(/asdf1/i)).toBeVisible();
    expect(screen.queryByText(dataResult[2].body)).toBeVisible();
    expect(screen.queryByTestId('verify1')).toBeVisible();
    expect(screen.queryByTestId('recommend2')).not.toBeVisible();
    expect(screen.queryByTestId('thanks1')).toBeVisible();
  });

  test('should show all comp through data pass', async () => {
    axiosMock.get.mockResolvedValueOnce(mockData);
    // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
    await act(async () => {
      render(<Ratings rating={RatingData} />);
    });
    fireEvent.click(screen.queryByText('More Reviews'));
    expect(axiosMock.get).toBeCalled();
    fireEvent.click(screen.queryByTestId('entryphoto'));
    expect(screen.queryByTestId('entryphotoBig')).toBeVisible();
  });

  // test('should show all comp through data pass', async () => {
  //   axiosMock.get.mockResolvedValueOnce(mockData);
  //   // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
  //   await act(async () => {
  //     render(<Ratings rating={RatingData} />);
  //   });
  //   fireEvent.mouseEnter(screen.queryByTestId('bar-1'));
  //   console.log('WANNNTTT TOOO', screen.container.getElementsByClassName('divMapReview'))
  //   expect(screen.container.getElementsByClassName('divMapReview').length).toBe(2);
  // });

  // test('should show all comp through data pass', async () => {
  //   axiosMock.get.mockResolvedValueOnce(mockData);
  //   // axiosMock.get.mockResolvedValueOnce({ data: 'trythis' });
  //   await act(async () => {
  //     render(<Ratings rating={RatingData} />);
  //   });
  //   fireEvent.click(screen.queryByText('More Reviews'));
  //   // fireEvent.click(screen.queryByText(/MORE.../i));
  //   expect(axiosMock.get).toBeCalled();
  //   expect(screen.queryByText(/MORE../i)).toBeVisible();
  //   // expect(screen.queryByText(dataResult[2].body)).toBeInTheDocument();
  // });
});
