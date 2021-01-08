import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  filterTransactionsByDates,
  recalculateTransactionsForActiveCurrency,
} from 'Utils/functions';

const FilteredTransactionsContainer = ({children, expenses, incomes, datesRange, currencies}) => {
    const filteredExpenses = filterTransactionsByDates(expenses, datesRange);
    const filteredIncomes = filterTransactionsByDates(incomes, datesRange);

    const recalculatedExpenses = recalculateTransactionsForActiveCurrency({transactions: filteredExpenses, currencies});
    const recalculatedIncomes = recalculateTransactionsForActiveCurrency({transactions: filteredIncomes, currencies});

    const availableCurrenciesState = currencies;

    return children({
      recalculatedExpenses,
      recalculatedIncomes,
      availableCurrenciesState,
    });
};

FilteredTransactionsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  expenses: PropTypes.array,
  incomes: PropTypes.array,
  datesRange: PropTypes.object,
  currencies: PropTypes.object
};

const mapStateToProps = state => {
    return {
        expenses: state.expenses.expenses,
        incomes: state.incomes.incomes,
        datesRange: state.datesRange.datesRange,
        currencies: state.currencies
    }
}

export default connect(mapStateToProps)(FilteredTransactionsContainer);