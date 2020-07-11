import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  form {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .form-info-side {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    color: white;
    flex-direction: column;
    background-color: ${({ theme }) => theme.mainBlue};
  }

  .form-user-input-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin-left: 72px;
    width: 50%;
  }

  @media (max-width: 961px) and (min-width: 577px) and (min-height: 599px) {
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow-y: auto;
    }

    .form-info-side {
      width: 100%;
      height: 50vh;
    }

    .form-user-input-side {
      width: 100%;
      height: 50vh;
      justify-content: flex-start;
      align-items: center;
      margin-left: 0;
    }
  }

  @media (max-height: 600px) {
    form {
      display: flex;
      margin: 0;
    }

    .form-info-side {
      display: flex;
      height: 120vh;
    }

    .form-user-input-side {
      display: flex;
      height: 120vh;
      width: 50%;
      padding: 0 32px;
      margin: 0;
    }
  }

  @media (max-width: 576px) {
    .form-info-side {
      width: 100%;
      display: ${({ formCorrectness }) =>
        formCorrectness === true ? "none" : "flex"};
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
    }

    .form-user-input-side {
      display: ${({ formCorrectness }) =>
        formCorrectness === true ? "flex" : "none"};
      width: 100%;
      margin-left: 0;
    }
  }

  .visible {
    display: flex;
  }

  .invisible {
    display: none;
  }
`;

export default GlobalStyle;