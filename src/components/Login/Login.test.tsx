import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import LOGIN_MUTATION from './loginMutation';

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        email: 'andrew@email.com',
        password: 'password',
      },
    },
    result: {
      data: {
        login: {
          token: 'mock-token',
        },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        email: 'andrew@email.com',
        password: 'wrongpassword',
      },
    },
    error: new Error('Incorrect email or password'),
  },
];

test('renders login form', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </MockedProvider>,
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('displays validation error for invalid email format', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </MockedProvider>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'invalid-email' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  const helperText = screen.getByText('Invalid email format', { selector: 'p' });
  expect(helperText).toBeInTheDocument();
});

test('submits login form and stores token on success', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    </MockedProvider>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'andrew@email.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(localStorage.getItem('token')).toBe('mock-token'));
  expect(screen.getByText(/login successful/i)).toBeInTheDocument();
});

test('displays error on failed login', async () => {
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </MockedProvider>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'andrew@email.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'wrongpassword' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    const alerts = screen.getAllByText('Incorrect email or password');
    expect(alerts.length).toBeGreaterThan(0);
  });
});

test('displays network error', async () => {
  const networkErrorMocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          email: 'andrew@email.com',
          password: 'password',
        },
      },
      error: new Error('Network error'),
    },
  ];

  render(
    <MockedProvider mocks={networkErrorMocks} addTypename={false}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </MockedProvider>,
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'andrew@email.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(screen.getByText(/network error/i)).toBeInTheDocument());
});
