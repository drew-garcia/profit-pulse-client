import React from 'react';

interface PrivateRouteProps {
  element: React.ReactElement;
  fallback: React.ReactElement;
}

function PrivateRoute({ element, fallback }: PrivateRouteProps): JSX.Element {
  const token = localStorage.getItem('token');
  return token ? element : fallback;
}

export default PrivateRoute;
