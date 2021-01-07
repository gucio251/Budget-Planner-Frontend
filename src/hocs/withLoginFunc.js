import React, {useEffect, useState} from 'react';
import {userActions} from 'redux/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';

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
            console.log(window.MyComponentRef);
            //window.MyComponentRef.current.setFieldValue("password", "");
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