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
    overflow: hidden;
  }

  .custom-today-day::after {
    visibility: hidden;
  }

  .DatePicker {
    display: flex;
    width: 100%;
    z-index: 1;
  }

  .Calendar__weekDay {
    color: #283593!important;
    font-weight: bold!important;
  }

  .Calendar__day {
    color: #8B8795!important;
  }

  .-selected {
    color: white!important
  }

  .DatePicker__calendarContainer.-top{
    z-index: 3!important;
  }
`;

export default GlobalStyle;
