import * as types from './actionTypes';
import * as userApi from '../../api/userApi';

export function loadUsersSuccess(users){
    return {
        type: types.LOAD_USERS_SUCCESS,
        users
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