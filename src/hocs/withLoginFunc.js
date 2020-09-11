import React, {useEffect, useState} from 'react';
import {userActions} from 'redux/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {routes} from 'routes';

const withLoginFunc = Component => props => {
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.login);
    const [errors, setErrors] = useState("");
    const history = useHistory();

    const handleFormSubmit = (values) => {
        dispatch(userActions.login(values))
    }

    useEffect(() => {
        if(loginState.hasOwnProperty("errorMsg")){
            setErrors({msg: loginState.errorMsg})
            window.MyComponentRef.current.setFieldValue("password", "");
        }else if (loginState.loggedIn === true){
            history.push(routes.dashboard);
        }
    }, [loginState.loggedIn, loginState.logginIn, loginState.errorMsg])

    return (
        <Component
            {...props}
            handleFormSubmit={handleFormSubmit}
            loginErrors={errors === "" ? "" : errors}/>
    );
};

export default withLoginFunc;