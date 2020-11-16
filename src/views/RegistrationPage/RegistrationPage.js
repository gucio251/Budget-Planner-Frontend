import React from 'react';
import withUsers from 'hocs/withUsers';
import withRegistrationFunc from 'hocs/withRegistrationFunc';
import withMobileHandling from 'hocs/withMobileHandling';
import { compose } from 'recompose';
import { formSettings } from './registrationPageData';
import Form from 'components/Form/Form';

const RegistrationPageTemplate = ({
  users,
  handleFormSubmit,
  loginErrors,
  displayInfoSide,
  handleMobileDisplay,
  handleMovingToInputSide,
  errors
}) => {

  return (
    <Form
      settings={formSettings}
      users={users}
      handleFormSubmit={handleFormSubmit}
      loginErrors={loginErrors}
      displayInfoSide={displayInfoSide}
      handleMovingToInputSide={handleMovingToInputSide}
      handleMobileDisplay={handleMobileDisplay}
      errors={errors}
    />
  );
};

const RegistrationPage = compose(
  withUsers,
  withRegistrationFunc,
  withMobileHandling
)(RegistrationPageTemplate);

export default RegistrationPage;
