import React from 'react';
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


    return children({
      recalculatedExpenses,
      recalculatedIncomes,
    });
};

FilteredTransactionsContainer.propTypes = {
    
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