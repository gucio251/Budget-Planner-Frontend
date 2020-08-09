import React from "react";
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
  );
}

export default App;
