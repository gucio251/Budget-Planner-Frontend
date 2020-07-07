import * as types from './actionTypes';
import * as userApi from '../../api/userApi';

export function loadUsersSuccess(users){
    return {
        type: types.LOAD_USERS_SUCCESS,
        users
    }
}

export function createUserSuccess(user){
    return {
        type: types.CREATE_USER_SUCCESS,
        user
    }
}

export function loadUsers(){
    return function (dispatch){
        return userApi.getAllUsers()
            .then((users) => {
                const {users: usersLogins}= users;
                dispatch(loadUsersSuccess(usersLogins));
            })
            .catch(error => {
                throw error
            })
    }
}

export function addUser(user){
    return function(dispatch){
        return userApi.saveUser(user)
            .then((savedUser) => {
                dispatch(createUserSuccess(savedUser.email))
            })
            .catch(error => {
                throw error;
            })
    }
}