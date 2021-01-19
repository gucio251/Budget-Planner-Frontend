import {userConstants} from 'redux/actions/actionTypes';
import { navigate } from '@reach/router';
import { routes } from 'routes';
import {Users} from 'api/services/API'

const load = () => dispatch => {
    const request = () => { return { type: userConstants.GETUSERS_REQUEST } }
    const success = payload => { return { type: userConstants.GETUSERS_SUCCESS, payload} }
    const failure = payload => { return { type: userConstants.GETUSERS_FAILURE, payload} }

    dispatch(request());

    Users.index()
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

    Users.create(user).then(
        ({email}) => {
            navigate(routes.successRegistrationPage);
            dispatch(success(email));},
        error => {dispatch(failure(error))}
    );
}

const login = (user, clearPasswordField) => dispatch => {
    const request = () => { return { type: userConstants.LOGIN_REQUEST }}
    const success = user => { return { type: userConstants.LOGIN_SUCCESS, payload: user }}
    const failure = error => { return { type: userConstants.LOGIN_FAILURE, payload: error }}

    dispatch(request());
    Users.login(user).then(
        ({token}) => {
            dispatch(success(token));
            navigate('dashboard');
        },
        (error) => {
            clearPasswordField();
            dispatch(failure(error.message));
        }
    );
}

const logout = () => dispatch => {
    const success = () => {return {type: userConstants.LOGOUT}}

    localStorage.removeItem('token');
    dispatch(success());
    navigate(routes.loginPage);
}


export const userActions = {
    load,
    add,
    login,
    logout
}

