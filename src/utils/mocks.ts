import LOGIN_MUTATION from '../components/Login/loginMutation';

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

export default mocks;
