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
describe('Related Products should make calls', () => {
  test('Render the component fully', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: knownRelated });
    await act(async () => {
      render(<RelatedProducts id={testId} product={testProd} rating={testRating} currStyle={testStyle} />);
    });
    expect(axiosMock.get).toBeCalled();
    screen.debug();
  });

  test('Should do something with the arrows idk', async () => {
    axiosMock.get.mockResolvedValueOnce({});
    render(<RelatedProducts id={testId} product={testProd} rating={testRating} currStyle={testStyle} />);
    expect(screen.queryByText('◀')).toBeNull();
    expect(screen.queryByText('▶')).toExist();
    // mock anything you need, render, etc.
    // const firstImage = await screen.findByAltText(relatedProduct[0].altText);
    // await userEvent.click(await screen.findByRole('button', { name: ' > ' });
    // expect(firstImage).not.toBeInTheDocument();
  });
});
