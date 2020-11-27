import React from 'react';
import { compose } from 'recompose';
import { userActions } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';

import Form from 'components/Form/Form';
import { formSettings } from './registrationPageData';
import withMobileHandling from 'hocs/withMobileHandling';
import withUsers from 'hocs/withUsers';

const RegistrationPageTemplate = ({
  users,
  stateErrors,
  loginErrors,
  displayInfoSide,
  handleMobileDisplay,
  handleMovingToInputSide,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = (values) => {
    dispatch(userActions.add(values));
  };
  return (
    <Form
      settings={formSettings}
      users={users}
      handleFormSubmit={handleFormSubmit}
      loginErrors={loginErrors}
      displayInfoSide={displayInfoSide}
      handleMovingToInputSide={handleMovingToInputSide}
      handleMobileDisplay={handleMobileDisplay}
      stateErrors={stateErrors}
    />
  );
};

const RegistrationPage = compose(
  withUsers,
  withMobileHandling
)(RegistrationPageTemplate);

export default RegistrationPage;
