import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export const ExchangeRates: React.FC = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h2>Exchange Rates</h2>
            <ul>
                {data.rates.map((rate: { currency: string; rate: string }) => (
                    <li key={rate.currency}>
                        {rate.currency}: {rate.rate}
                    </li>
                ))}
            </ul>
        </div>
    );
};