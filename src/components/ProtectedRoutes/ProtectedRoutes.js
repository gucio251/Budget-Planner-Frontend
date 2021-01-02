import React from 'react';
import {Redirect} from '@reach/router'
import {routes} from 'routes'

const ProtectedRoutes = ({component:Component, ...rest}) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? (
      <Component {...rest} />
    ) : (
      <Redirect from={rest.path} to={routes.loginPage} noThrow />
    );
};

export default ProtectedRoutes;
