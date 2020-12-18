import {userConstants} from 'redux/actions/actionTypes';
import { navigate } from '@reach/router';
import { routes } from 'routes';
import * as userApi from 'api/userApi';

const load = () => dispatch => {
    const request = () => { return { type: userConstants.GETUSERS_REQUEST } }
    const success = users => { return { type: userConstants.GETUSERS_SUCCESS, payload: users } }
    const failure = error => { return { type: userConstants.GETUSERS_FAILURE, payload: error } }

    dispatch(request());

    userApi.getAllUsers()
        .then(
            ({users}) => {
                dispatch(success(users));
            },
            error => {dispatch(failure(error))}
        );
}

const add = user => dispatch => {
    const request = () => { return { type: userConstants.REGISTER_REQUEST }}
    const success = token => { return { type: userConstants.REGISTER_SUCCESS, payload: token }}
    const failure = error => { return { type: userConstants.REGISTER_FAILURE, payload: error }}

    dispatch(request());

    userApi.saveUser(user).then(
        ({email}) => {
            navigate(routes.successRegistrationPage);
            dispatch(success(email));},
        error => {dispatch(failure(error))}
    );
}

const login = user => dispatch => {
    const request = () => { return { type: userConstants.LOGIN_REQUEST }}
    const success = user => { return { type: userConstants.LOGIN_SUCCESS, payload: user }}
    const failure = error => { return { type: userConstants.LOGIN_FAILURE, payload: error }}

    dispatch(request());
    userApi.authLogin(user).then(
        ({token}) => {
            dispatch(success(token));
            navigate(routes.dashboard);
        },
        (error) => {
            dispatch(failure(error.message));
        }
    );
}


export const userActions = {
    load,
    add,
    login,
}

