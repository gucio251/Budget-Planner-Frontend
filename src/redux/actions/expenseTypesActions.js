import {expenseTypesConstants} from 'redux/actions/actionTypes';
import {ExpenseTypes} from 'api/services/API'

const load = () => dispatch => {
    const request = () => { return { type: expenseTypesConstants.GETEXPENSETYPES_REQUEST } }
    const success = payload => { return { type: expenseTypesConstants.GETEXPENSETYPES_SUCCESS, payload } }
    const failure = payload => { return { type: expenseTypesConstants.GETEXPENSETYPES_FAILURE, payload } }

    dispatch(request());
    ExpenseTypes.index()
        .then(
            ({result}) => {dispatch(success(result))},
            error => { dispatch(failure(error)) }
        );
}

export const expenseTypesActions = {
    load
}