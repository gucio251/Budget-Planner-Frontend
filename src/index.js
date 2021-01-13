import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
//import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { theme } from 'localData/theme';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import GlobalStyle from './assets/styles/globalStyles';
import styled from 'styled-components';

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
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

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <AppStyle>
        <GlobalStyle />
        <App />
      </AppStyle>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
