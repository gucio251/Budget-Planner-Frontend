import React from 'react';
import { Router } from '@reach/router';
import { routes } from './routes';

import Dashboard from 'components/Dashboard/Dashboard';
import LoginPage from 'views/LoginPage/LoginPage';
import NotFound from 'views/NotFound/NotFound'
import ProtectedRoutes from 'components/ProtectedRoutes/ProtectedRoutes';
import RegistrationPage from 'views/RegistrationPage/RegistrationPage';
import StandardRoutes from 'components/StandardRoutes/StandardRoutes';
import SuccessPage from 'views/SuccessPage/SuccessPage';

const App = () => {
  return (
    <Router style={{ width: '100%', height: '100%'}}>
      <StandardRoutes component={RegistrationPage} path={routes.registrationPage} />
      <StandardRoutes component={SuccessPage} path={routes.successRegistrationPage} />
      <StandardRoutes component={LoginPage} path={routes.loginPage} />
      <ProtectedRoutes component={Dashboard} path={routes.dashboard}/>
      <NotFound default />
    </Router>
  );
};

export default App;
