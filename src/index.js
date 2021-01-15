import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from 'localData/theme';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import GlobalStyle from './assets/styles/globalStyles';


const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
