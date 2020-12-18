import {expenseTypesConstants} from 'redux/actions/actionTypes';
import * as expenseTypesApi from 'api/expenseTypesApi';

const load = (token) => dispatch => {
    const request = () => { return { type: expenseTypesConstants.GETEXPENSETYPES_REQUEST } }
    const success = payload => { return { type: expenseTypesConstants.GETEXPENSETYPES_SUCCESS, payload } }
    const failure = payload => { return { type: expenseTypesConstants.GETEXPENSETYPES_FAILURE, payload } }

    dispatch(request());
    expenseTypesApi.loadExpenseTypes(token)
        .then(
            ({result}) => {dispatch(success(result))},
            error => { dispatch(failure(error)) }
        );
}

export const expenseTypesActions = {
    load
}