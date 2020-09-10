import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
  }

  html {
    font-size: 62.5%;
    height: 100%;
    overflow: hidden;
  }

  body {
    font-size: 1.6rem;
    height: 100%;
    overflow: hidden;
  }
`;

export default GlobalStyle;