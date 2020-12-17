import {incomeTypesConstants} from 'redux/actions/actionTypes';
import * as incomeTypesApi from 'api/incomeTypesApi';

const load = (token) => dispatch => {
    const request = () => {return {type: incomeTypesConstants.GETINCOMETYPES_REQUEST}};
    const success = payload => {return {type: incomeTypesConstants.GETINCOMETYPES_SUCCESS, payload}};
    const failure = payload => {return {type: incomeTypesConstants.GETINCOMETYPES_ERROR, payload}};

    dispatch(request());

    incomeTypesApi.loadIncomeTypes(token)
        .then(
            ({result}) => {dispatch(success(result))},
            error => {dispatch(failure(error))}
        );
}

export const incomeTypesActions = {
    load
}