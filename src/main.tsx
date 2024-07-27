import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import './assets/styles/index.css';
import client from './utils/apolloClient';
import mocks from './utils/mocks';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
