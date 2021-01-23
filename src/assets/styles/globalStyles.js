import { createGlobalStyle } from 'styled-components';

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
    width: 100%;
    overflow: hidden;
  }

  .DayPicker {
    font-size: 1.4em;
    background-color: white;
    border-radius: 4px;
  }

  .DayPicker-Day{
    font-weight: 300;
  }

  .DayPicker * {
    outline: none;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside){
    background-color: #1665D8;
  }

  .DayPicker-Caption > div{
    display: flex;
    justify-content: center;
    color: #707070;
    font-weight: normal;
  }

`;

export default GlobalStyle;
