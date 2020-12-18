import React from "react";
<<<<<<< HEAD
import "./App.css";
import {Switch, Route} from "react-router-dom";
import {ProtectedRoutes} from "./components/ProtectedRoutes/ProtectedRoutes"
import {routes} from './routes';
import {ManageRegistrationForm} from './components/RegistrationForm/ManageRegistrationForm';
import {ManageLoginForm} from './components/ManageLoginForm/ManageLoginForm';
import {Dashboard} from './components/Dashboard/Dashboard';


function App() {
  return (
    <Switch>
      <Route exact path={routes.registrationPage} component={ManageRegistrationForm}/>
      <Route path={routes.loginPage} component={ManageLoginForm}/>
      <ProtectedRoutes path={routes.dashboard} component={Dashboard}/>
    </Switch>
=======
import {Router} from '@reach/router';
import {routes} from './routes';

import Dashboard from 'components/Dashboard/Dashboard';
import LoginPage from 'views/LoginPage/LoginPage';
import ProtectedRoutes from 'components/ProtectedRoutes/ProtectedRoutes'
import RegistrationPage from 'views/RegistrationPage/RegistrationPage';
import SuccessPage from 'views/SuccessPage/SuccessPage'

const App = () => {
  return (
    <Router style={{width: '100%'}}>
      <RegistrationPage path={routes.registrationPage}/>
      <SuccessPage path={routes.successRegistrationPage}/>
      <LoginPage path={routes.loginPage}/>
      <Dashboard path={routes.dashboard}/>
    </Router>
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
  );
}

export default App;
