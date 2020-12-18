import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import {BrowserRouter as Router} from 'react-router-dom';
import { theme } from "./localData/theme";
=======
import App from "./App";
import { ThemeProvider } from "styled-components";
//import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { theme } from "localData/theme";
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import GlobalStyle from "./assets/styles/globalStyles";
import styled from "styled-components";

const AppStyle = styled.div`
<<<<<<< HEAD
  display: flex;
`;

=======
  width: 100%;
  display: flex;
`;

/* const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Rubik'
    ].join(','),
  },
  palette: {
    
  }
}); */
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <Router>
=======
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
        <AppStyle>
          <GlobalStyle />
          <App />
        </AppStyle>
<<<<<<< HEAD
      </Router>
=======
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
<<<<<<< HEAD

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
=======
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
