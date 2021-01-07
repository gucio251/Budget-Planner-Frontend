import {incomeTypesConstants} from 'redux/actions/actionTypes';
import {IncomeTypes} from 'api/services/API';

const load = () => dispatch => {
    const request = () => {return {type: incomeTypesConstants.GETINCOMETYPES_REQUEST}};
    const success = payload => {return {type: incomeTypesConstants.GETINCOMETYPES_SUCCESS, payload}};
    const failure = payload => {return {type: incomeTypesConstants.GETINCOMETYPES_ERROR, payload}};

    dispatch(request());

    IncomeTypes.index()
        .then(
            ({result}) => {dispatch(success(result))},
            error => {dispatch(failure(error))}
        );
}

export const incomeTypesActions = {
    load
}