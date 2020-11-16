import React from "react";
import {Switch, Route} from "react-router-dom";
import {ProtectedRoutes} from "./components/ProtectedRoutes/ProtectedRoutes"
import {routes} from './routes';
import LoginPage from 'views/LoginPage/LoginPage';
import RegistrationPage from 'views/RegistrationPage/RegistrationPage';
import {SuccessPage} from 'views/SuccessPage/SuccessPage'
import {Dashboard} from 'components/Dashboard/Dashboard';


function App() {
  return (
    <Switch>
      <Route exact path={routes.registrationPage} component={RegistrationPage}/>
      <Route path={routes.successRegistrationPage} component={SuccessPage} />
      <Route path={routes.loginPage} component={LoginPage}/>
      <ProtectedRoutes path={routes.dashboard} component={Dashboard}/>
    </Switch>
  );
}

export default App;
