import React from 'react';
import { Redirect } from '@reach/router';
import { routes } from 'routes';

const StandardRoutes = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  return !isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Redirect from={rest.path} to={'./'} noThrow />
  );
};

export default StandardRoutes;
