import {userConstants} from './actionTypes';
import * as userApi from '../../api/userApi';

export const userActions = {
    loadUsers,
    addUser
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

