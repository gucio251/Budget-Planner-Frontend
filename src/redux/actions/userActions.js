import {userConstants} from 'redux/actions/actionTypes';
import {routes} from 'routes'
import * as userApi from 'api/userApi';

const loadUsers = () => dispatch => {
    const request = () => { return { type: userConstants.GETUSERS_REQUEST } }
    const success = users => { return { type: userConstants.GETUSERS_SUCCESS, users } }
    const failure = error => { return { type: userConstants.GETUSERS_FAILURE, error } }

    dispatch(request());

    userApi.getAllUsers()
        .then(
            allUsers => {dispatch(success(allUsers.users))},
            error => {dispatch(failure(error))}
        );
}

const addUser = (user, history) => dispatch => {
    const request = () => { return { type: userConstants.REGISTER_REQUEST }}
    const success = user => { return { type: userConstants.REGISTER_SUCCESS, user }}
    const failure = error => { return { type: userConstants.REGISTER_FAILURE, error }}

    dispatch(request());

    userApi.saveUser(user).then(
        savedUser => {
            history.push(routes.successRegistrationPage);
            dispatch(success(savedUser));
        },
        error => {dispatch(failure(error))}
    );
}

const login = (user) => {
    const request = () => { return { type: userConstants.LOGIN_REQUEST }}
    const success = (user) => { return { type: userConstants.LOGIN_SUCCESS, user }}
    const failure = (error) => { return { type: userConstants.LOGIN_FAILURE, error }}

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());
            userApi.authLogin(user).then(
                (userInfo) => {
                    userInfo.email = user.email;
                    dispatch(success(userInfo));
                    resolve(user);
                },
                (error) => {
                    dispatch(failure(error.message));
                    reject(error);
                }
            );
        })
    }
}


export const userActions = {
    loadUsers,
    addUser,
    login,
}

