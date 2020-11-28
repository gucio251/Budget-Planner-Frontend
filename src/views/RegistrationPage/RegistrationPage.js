import React from 'react';
import { compose } from 'recompose';
import { userActions } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';

import InitialPageTemplate from 'components/InitialPageTemplate/InitialPageTemplate';
import { formSettings } from './registrationPageData';
import withMobileHandling from 'hocs/withMobileHandling';
import withUsers from 'hocs/withUsers';

const RegistrationPageTemplate = ({
  users,
  stateErrors,
  displayInfoSide,
  handleMobileDisplay,
  handleMovingToInputSide,
}) => {
  const dispatch = useDispatch();
  const handleUserRegistration = (values) => {
    dispatch(userActions.add(values));
  };
  return (
    <InitialPageTemplate
      settings={formSettings}
      users={users}
      handleFormSubmit={handleUserRegistration}
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
