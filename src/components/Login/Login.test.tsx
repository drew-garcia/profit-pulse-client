import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Login from './Login';
import LOGIN_MUTATION from './loginMutation';

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        email: 'test@example.com',
        password: 'password123',
      },
    },
    result: {
      data: {
        login: {
          token: 'test-token',
        },
      },
    },
  },
];

test('renders login form', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login />
    </MockedProvider>,
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('submits login form and stores token', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login />
    </MockedProvider>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByText(/login/i));

  await waitFor(() => expect(localStorage.getItem('token')).toBe('test-token'));
});

test('displays error on failed login', async () => {
  const errorMocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          email: 'test@example.com',
          password: 'password123',
        },
      },
      error: new Error('Invalid credentials'),
    },
  ];

  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <Login />
    </MockedProvider>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByText(/login/i));

  await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
});
