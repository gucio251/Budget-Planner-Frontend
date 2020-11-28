import React from 'react';
import { compose } from 'recompose';
import { formSettings } from "./loginPageData"
import InitialPageTemplate from 'components/InitialPageTemplate/InitialPageTemplate';
import withUsers from 'hocs/withUsers';
import withLoginFunc from 'hocs/withLoginFunc';
import withMobileHandling from 'hocs/withMobileHandling';

const LoginPageTemplate = ({ users, handleFormSubmit, stateErrors, displayInfoSide, handleMobileDisplay, handleMovingToInputSide}) => {
  return (
    <InitialPageTemplate
      settings={formSettings}
      users={users}
      handleFormSubmit={handleFormSubmit}
      stateErrors={stateErrors}
      displayInfoSide={displayInfoSide}
      handleMovingToInputSide={handleMovingToInputSide}
      handleMobileDisplay={handleMobileDisplay}
    />
  );
};

const LoginPage = compose(
  withUsers,
  withLoginFunc,
  withMobileHandling,
)(LoginPageTemplate)

export default LoginPage;