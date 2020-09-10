import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import {BrowserRouter as Router} from 'react-router-dom';
import { theme } from "localData/theme";
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import GlobalStyle from "./assets/styles/globalStyles";
import styled from "styled-components";

const AppStyle = styled.div`
  display: flex;
`;


const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <AppStyle>
          <GlobalStyle />
          <App />
        </AppStyle>
      </Router>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
