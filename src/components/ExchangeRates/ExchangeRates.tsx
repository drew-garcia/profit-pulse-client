// src/components/ExchangeRates.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import EXCHANGE_RATES from './exchangeRatesQuery';

function ExchangeRates() {
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
}

export default ExchangeRates;
