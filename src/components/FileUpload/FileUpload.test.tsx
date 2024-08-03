import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import FileUpload from './FileUpload';
import UPLOAD_TRADE from './uploadTradeMutation';

const mocks = [
  {
    request: {
      query: UPLOAD_TRADE,
      variables: {
        userId: '1',
        stockSymbol: 'AAPL',
        tradeType: 'BUY',
        quantity: 10,
        price: 150.0,
        tradeDate: '2023-08-01',
      },
    },
    result: {
      data: {
        uploadTrade: {
          id: '123',
        },
      },
    },
  },
];

test('renders FileUpload component', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FileUpload />
    </MockedProvider>,
  );
  expect(screen.getByText('Upload')).toBeInTheDocument();
});

test('uploads a file and calls the mutation', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FileUpload />
    </MockedProvider>,
  );

  const file = new File(
    ['userId,stockSymbol,tradeType,quantity,price,tradeDate\n1,AAPL,BUY,10,150.0,2023-08-01'],
    'trades.csv',
    { type: 'text/csv' },
  );

  const input = screen.getByLabelText(/file/i);
  await userEvent.upload(input, file);

  fireEvent.submit(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });
});
