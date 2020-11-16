import {expenseTypesConstants} from 'redux/actions/actionTypes';
import * as expenseTypesApi from 'api/expenseTypesApi';

const load = (token) => dispatch => {
    const request = () => { return { type: expenseTypesConstants.GETEXPENSETYPES_REQUEST } }
    const success = expenseTypes => { return { type: expenseTypesConstants.GETEXPENSETYPES_SUCCESS, expenseTypes } }
    const failure = error => { return { type: expenseTypesConstants.GETEXPENSETYPES_FAILURE, error } }

    dispatch(request());
    expenseTypesApi.loadExpenseTypes(token)
        .then(
            allExpenseTypes => {
                const { result } = allExpenseTypes;
                dispatch(success(result))
            },
            error => { dispatch(failure(error)) }
        );
}

export const expenseTypesActions = {
    load
}