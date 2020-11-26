import { expensesActions } from 'redux/actions/expensesActions';
import { groupedExpensesConstants } from '../actions/actionTypes';
import { expenseTypeSvgCorrelation } from 'Utils/svgCorrelation'

const groupTransactionsByCategoryWithSvg = (transactions) => {
    return transactions.reduce((groupedData, currentTransaction)=> {
        const { amount, category, Icon } = currentTransaction;

        if(groupedData.hasOwnProperty(category)){
            return {
                ...groupedData,
                [category]: {
                    ...groupedData[category],
                    amount: groupedData[category].amount + currentTransaction.amount,
                    howManyOccurences: groupedData[category].howManyOccurences + 1,
                }
            }
        }else{
            return {
              ...groupedData,
              [category]: {
                amount: amount,
                howManyOccurences: 1,
                Icon: Icon,
              },
            };
        }
    }, {})
}

const groupedExpensesReducer = (state = {}, action) => {
  switch (action.type) {
    case groupedExpensesConstants.GROUPEDEXPENSES_LOAD:
    const result = groupTransactionsByCategoryWithSvg(
      action.expenses,
      expenseTypeSvgCorrelation
    );
      return {
        ...state,
        groupedExpenses: result,
      };
    default:
      return state;
  }
};

export default groupedExpensesReducer;
