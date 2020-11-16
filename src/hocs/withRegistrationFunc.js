import React, { useEffect, useState } from 'react';
import { userActions } from 'redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';

const withLoginFunc = (Component) => (props) => {
  const dispatch = useDispatch();
  const registrationState = useSelector((state) => state.registration);
  const loginState = useSelector((state) => state.login);
  const [errors, setErrors] = useState('');
  const history = useHistory();

  const handleFormSubmit = (values) => {
    dispatch(userActions.addUser(values, history));
  };

  useEffect(() => {
    if (registrationState.hasOwnProperty('errorMsg')) {
      setErrors({ msg: registrationState.errorMsg });
    } else if (loginState.loggedIn === true) {
      history.push(routes.dashboard);
    }
  }, [loginState.loggedIn, loginState.logginIn, registrationState.errorMsg]);

  return (
    <Component
      {...props}
      handleFormSubmit={handleFormSubmit}
      errors={errors === '' ? '' : errors}
    />
  );
};

export default withLoginFunc;
