import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  filterTransactionsByDates,
  sortTransactionsByChosenProperty,
  convertDate
} from 'Utils/functions';

const withExpensesAndIncomes = (Component) => props => {
        const [transactionList, setTransactionList] = useState([]);
        const expensesState = useSelector((state) => state.expenses);
        const incomesState = useSelector((state) => state.incomes);
        const datesRange = useSelector(state => state.datesRange);

        useEffect(() => {
            if (expensesState.loading === false && incomesState.loading === false) {
                const filteredExpensesByDates = filterTransactionsByDates(expensesState.expenses, datesRange.datesRange);
                const filteredIncomesByDates = filterTransactionsByDates(incomesState.incomes, datesRange.datesRange);
                const filteredTransactions = [].concat(filteredExpensesByDates, filteredIncomesByDates);
                const sortedTransactions = sortTransactionsByChosenProperty(filteredTransactions, 'transaction_date');
                const convertedTransactionDate = convertDate(sortedTransactions);
                setTransactionList(convertedTransactionDate);
            }
        }, [expensesState, incomesState, datesRange.datesRange]);

        return (<Component {...props} transactionList={transactionList.slice(-4).reverse()} />)
};

withExpensesAndIncomes.propTypes = {
    
};

export default withExpensesAndIncomes;