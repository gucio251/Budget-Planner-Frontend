import React from 'react';
import { compose } from 'recompose';
import { formSettings } from "./loginPageData"
import InitialPageTemplate from 'components/InitialPageTemplate/InitialPageTemplate';
import withUsers from 'hocs/withUsers';
import withLoginFunc from 'hocs/withLoginFunc';

const LoginPageTemplate = ({ users, handleFormSubmit, stateErrors }) => {
  return (
    <InitialPageTemplate
      settings={formSettings}
      users={users}
      handleFormSubmit={handleFormSubmit}
      stateErrors={stateErrors}
    />
  );
};

const LoginPage = compose(
  withUsers,
  withLoginFunc,
)(LoginPageTemplate)

export default LoginPage;