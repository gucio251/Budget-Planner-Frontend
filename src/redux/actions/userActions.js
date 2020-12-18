<<<<<<< HEAD
import {userConstants} from './actionTypes';
import {useHistory} from 'react-router-dom';
import * as userApi from '../../api/userApi';

export const userActions = {
    loadUsers,
    addUser,
    login,
    setError
}

function loadUsers(){
    return dispatch => {
        dispatch(request());

        userApi.getAllUsers()
            .then(
                allUsers => {dispatch(success(allUsers.users))},
                error => {dispatch(failure(error))}
            );
    }

    function request() {return {type: userConstants.GETUSERS_REQUEST}}
    function success(users) {return {type: userConstants.GETUSERS_SUCCESS, users}}
    function failure(error) {return {type: userConstants.GETUSERS_FAILURE, error}}
}

function addUser(user){
    return dispatch => {
        dispatch(request());

        userApi.saveUser(user)
            .then(
                savedUser => {dispatch(success(savedUser))},
                error => {dispatch(failure(error))}
            );
    }

    function request() {return {type: userConstants.REGISTER_REQUEST}}
    function success(user) {return {type: userConstants.REGISTER_SUCCESS, user}}
    function failure(error) {return {type: userConstants.REGISTER_FAILURE, error}}
}

function login(user, history){
    return dispatch => {
        dispatch(request());
        userApi.authLogin(user)
            .then(
                userInfo => {
                    history.push("/dashboard");
                    userInfo.email = user.email;
                    dispatch(success(userInfo));
                },
                error => {
                    dispatch(failure(error.message));
                }
            )
    }

    function request() {return {type: userConstants.LOGIN_REQUEST}}
    function success(user) {return {type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error) {return {type: userConstants.LOGIN_FAILURE, error}}
}

function setError(error){
    return dispatch => {
        dispatch(addError(error));
    }

    function addError(error) {return {type: userConstants.LOGIN_ERROR, error}}
=======
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
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
}

