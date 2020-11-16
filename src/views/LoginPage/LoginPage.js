import React from 'react';
import withUsers from "hocs/withUsers";
import withLoginFunc from "hocs/withLoginFunc";
import withMobileHandling from "hocs/withMobileHandling";
import { compose } from "recompose"
import { formSettings } from "./loginPageData"
import Form from "components/Form/Form"

const LoginPageTemplate = ({ users, handleFormSubmit, errors, displayInfoSide, handleMobileDisplay, handleMovingToInputSide}) => {
  return (
    <Form
      settings={formSettings}
      users={users}
      handleFormSubmit={handleFormSubmit}
      errors={errors}
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