import React from "react";
import {Switch, Route} from "react-router-dom";
import {ProtectedRoutes} from "./components/ProtectedRoutes/ProtectedRoutes"
import {routes} from './routes';
import {LoginForm} from 'views/LoginPage/LoginForm';
import {RegistrationForm} from 'views/RegistrationPage/RegistrationForm';
import {SuccessPage} from 'views/SuccessPage/SuccessPage'
import {Dashboard} from 'components/Dashboard/Dashboard';


function App() {
  return (
    <Switch>
      <Route exact path={routes.registrationPage} component={RegistrationForm}/>
      <Route path={routes.successRegistrationPage} component={SuccessPage} />
      <Route path={routes.loginPage} component={LoginForm}/>
      <ProtectedRoutes path={routes.dashboard} component={Dashboard}/>
    </Switch>
  );
}

export default App;
