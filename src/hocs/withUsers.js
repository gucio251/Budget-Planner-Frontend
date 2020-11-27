import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {routes} from 'routes'
import {userActions} from 'redux/actions/userActions'

const withUsers = Component => props => {
    const [errorMsg, setErrorMsg] = useState(false);
    const dispatch = useDispatch();
    const registeredUsers = useSelector(state => state.users);

    useEffect(()=>{
        switch(registeredUsers.status){
            case 'idle':
                dispatch(userActions.load());
                break;
            case 'failed':
                setErrorMsg({ msg: registeredUsers.errorMsg, link: routes.loginPage, disabled: true })
            default:
                break;
        }
    }, [registeredUsers])

    return (
        <Component {...props} users={{emails: registeredUsers.emails}} stateErrors={errorMsg}/>
    );
};

export default withUsers;