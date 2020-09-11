import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {routes} from 'routes'
import {userActions} from 'redux/actions/userActions'

const withUsers = Component => props => {
    const [usersEmails, setUsersEmails] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const dispatch = useDispatch();
    const registeredUsers = useSelector(state => state.users);

    useEffect(()=>{
        const loadingDataFinished = registeredUsers.hasOwnProperty("emails") || registeredUsers.hasOwnProperty("errorMsg");

        const action = !loadingDataFinished ? dispatch(userActions.loadUsers()) :
            registeredUsers.hasOwnProperty("emails") ? setUsersEmails(registeredUsers.emails) :
                registeredUsers.hasOwnProperty("errorMsg") ? setErrorMsg({ msg: registeredUsers.errorMsg, link: routes.loginPage, disabled: true }) : "";
    }, [registeredUsers.errorMsg, registeredUsers.emails])

    return (
        <Component {...props} users={{emails: usersEmails, errorMsg: errorMsg || null}}/>
    );
};

export default withUsers;