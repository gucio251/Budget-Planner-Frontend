import React from "react";
import "./App.css";
import ManageRegistrationForm from './components/RegistrationForm/ManageRegistrationForm'
import GlobalStyle from './assets/styles/globalStyles'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from 'styled-components'

const AppStyle = styled.div`
  display: flex;
`

function App() {
  return (
    <BrowserRouter>

    <Switch>

    <Route  path='/'  />



    </Switch>



      <AppStyle>
        <GlobalStyle />
        <ManageRegistrationForm />
      </AppStyle>
    </BrowserRouter>
  );
}

export default App;
