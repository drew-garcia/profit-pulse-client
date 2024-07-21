import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {EXCHANGE_RATES, ExchangeRates} from './ExchangeRates';

const mocks = [
    {
        request: {
            query: EXCHANGE_RATES,
        },
        result: {
            data: {
                rates: [
                    {currency: 'USD', rate: '1.00'},
                    {currency: 'EUR', rate: '0.90'},
                ],
            },
        },
    },
];

test('renders exchange rates', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ExchangeRates/>
        </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText('USD: 1.00')).toBeInTheDocument();
        expect(screen.getByText('EUR: 0.90')).toBeInTheDocument();
    });
});