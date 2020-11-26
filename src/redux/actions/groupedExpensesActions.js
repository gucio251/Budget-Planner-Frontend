import { groupedExpenses } from 'redux/actions/actionTypes';
import * as expenseTypesApi from 'api/expenseTypesApi';
import {useSelector} from 'react-redux';

const load = (expenses) => (dispatch) => {
  const request = () => {
    return { type: expenseTypesConstants.GETEXPENSETYPES_REQUEST };
  };
  

/*   dispatch(request());
  expenseTypesApi.loadExpenseTypes(token).then(
    (allExpenseTypes) => {
      const { result } = allExpenseTypes;
      dispatch(success(result));
    },
    (error) => {
      dispatch(failure(error));
    }
  ); */
};

export const groupedExpensesActions = {
  load,
};
