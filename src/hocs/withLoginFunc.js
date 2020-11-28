import React, {useEffect, useState} from 'react';
import {userActions} from 'redux/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {routes} from 'routes';

const withLoginFunc = Component => props => {
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.login);
    const [errors, setErrors] = useState(false);

    const handleFormSubmit = (values) => {
        dispatch(userActions.login(values))
    }

    useEffect(() => {
        if(loginState.error){
            setErrors({msg: loginState.error})
            window.MyComponentRef.current.setFieldValue("password", "");
        }else{
            setErrors(false);
        }
    }, [loginState])

    return (
      <Component
        {...props}
        handleFormSubmit={handleFormSubmit}
        stateErrors={errors}
      />
    );
};

export default withLoginFunc;