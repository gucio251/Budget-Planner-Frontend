import {incomeTypesConstants} from 'redux/actions/actionTypes';
import * as incomeTypesApi from 'api/incomeTypesApi';

const load = (token) => dispatch => {
    const request = () => {return {type: incomeTypesConstants.GETINCOMETYPES_REQUEST}};
    const success = incomes => {return {type: incomeTypesConstants.GETINCOMETYPES_SUCCESS, incomes}};
    const failure = error => {return {type: incomeTypesConstants.GETINCOMETYPES_ERROR, error}};

    dispatch(request());

    incomeTypesApi.loadIncomeTypes(token)
        .then(
            allIncomes => {
                const {result} = allIncomes;
                dispatch(success(result));
            },
            error => {dispatch(failure(error))}
        );
}

export const incomeTypesActions = {
    load
}