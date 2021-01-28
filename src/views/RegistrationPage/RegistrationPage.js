import React from 'react';
import { compose } from 'recompose';
import { userActions } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';

import InitialPageTemplate from 'components/InitialPageTemplate/InitialPageTemplate';
import { formSettings } from './registrationPageData';
import withUsers from 'hocs/withUsers';

const RegistrationPageTemplate = ({
  users,
  stateErrors
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
      stateErrors={stateErrors}
    />
  );
};

const RegistrationPage = compose(
  withUsers,
)(RegistrationPageTemplate);

export default RegistrationPage;
