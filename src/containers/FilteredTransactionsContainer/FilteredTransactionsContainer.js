import {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  filterTransactionsByDates,
  recalculateTransactionsForActiveCurrency,
} from 'Utils/functions';

const FilteredTransactionsContainer = ({children, expenses, incomes, datesRange, currencies}) => {
    const [filteredTransactions, setFilteredTransactions] = useState(calculateFilteredTransactions(expenses, incomes, datesRange, currencies))

    useEffect(()=> {
      setFilteredTransactions(calculateFilteredTransactions(expenses, incomes, datesRange, currencies));
    }, [expenses, incomes, datesRange, currencies])

    return children({
      ...filteredTransactions
    });
};

const convertToArray = transactionsObj => {
  if(transactionsObj === null || Object.keys(transactionsObj).length === 0) return []

  return Object.keys(transactionsObj).map(keyName => {
    return transactionsObj[keyName];
  })
}

const calculateFilteredTransactions = (expenses, incomes, datesRange, currencies) => {
    const filteredExpenses = filterTransactionsByDates(
      convertToArray(expenses),
      datesRange
    );
    const filteredIncomes = filterTransactionsByDates(
      convertToArray(incomes),
      datesRange
    );

    const recalculatedExpenses = recalculateTransactionsForActiveCurrency({
      transactions: filteredExpenses,
      currencies,
    });
    const recalculatedIncomes = recalculateTransactionsForActiveCurrency({
      transactions: filteredIncomes,
      currencies,
    });

    const availableCurrenciesState = currencies;

    return {
      recalculatedExpenses,
      recalculatedIncomes,
      availableCurrenciesState
    }
}

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