import React from 'react';
import { Router } from '@reach/router';
import { routes } from './routes';

import Dashboard from 'components/Dashboard/Dashboard';
import LoginPage from 'views/LoginPage/LoginPage';
import ProtectedRoutes from 'components/ProtectedRoutes/ProtectedRoutes';
import RegistrationPage from 'views/RegistrationPage/RegistrationPage';
import SuccessPage from 'views/SuccessPage/SuccessPage';

const App = () => {
  return (
    <Router style={{ width: '100%' }}>
      <RegistrationPage path={routes.registrationPage} />
      <SuccessPage path={routes.successRegistrationPage} />
      <LoginPage path={routes.loginPage} />
      <Dashboard path={routes.dashboard} />
    </Router>
  );
};

export default App;
