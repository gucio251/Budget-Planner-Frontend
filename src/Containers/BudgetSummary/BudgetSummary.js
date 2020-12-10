import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SingleSummaryField from 'components/UI/SingleSummaryField';
import {ReactComponent as BilanceIcon} from 'assets/icons/balanceDashboardIcon.svg';
import { ReactComponent as IncomeIcon } from 'assets/icons/incomeDashboardIcon.svg';
import { ReactComponent as SavingsIcon } from 'assets/icons/savingsDashboardIcon.svg';
import { ReactComponent as ExpensesIcon } from 'assets/icons/expensesDashboardIcon.svg';

import { filterTransactionsByDates } from 'Utils/functions';

const GridBox = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 47%  47%;
  grid-template-rows: 49% 49%;
  grid-gap: 2% 1%;

  &:first-child {
    align-self: center;
  }
`;


const BudgetSummary = ({ budgetSummary }) => {
  const {expensesSum, incomesSum, balance} = budgetSummary;
  return (
    <GridBox>
      <SingleSummaryField amount={balance} name="Balance">
        <BilanceIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={incomesSum} name="Income">
        <IncomeIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={1000} name="Savings">
        <SavingsIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={0 - expensesSum} name="Expenses">
        <ExpensesIcon />
      </SingleSummaryField>
    </GridBox>
  );
};

BudgetSummary.propTypes = {
  budgetSummary: PropTypes.shape({
    expensesSum: PropTypes.number.isRequired,
    incomesSum: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

const getSumOfTransactions = transactions => {
  return transactions.reduce((sum, currentTransaction) => {
    return sum + currentTransaction.amount;
  }, 0);
}

const getBudgetSummary = createSelector(
  (state) => state.expenses.expenses,
  (state) => state.incomes.incomes,
  (state) => state.datesRange.datesRange,
  (expenses, incomes, datesRange) => {
    const filteredExpenses = filterTransactionsByDates(expenses, datesRange);
    const filteredIncomes = filterTransactionsByDates(incomes, datesRange);

    const expensesSum = getSumOfTransactions(filteredExpenses);
    const incomesSum = getSumOfTransactions(filteredIncomes);

    const balance = incomesSum - expensesSum;

    return {
      expensesSum: expensesSum,
      incomesSum: incomesSum,
      balance: balance,
    };
  }
)

const mapState = (state) => {
  return {
    budgetSummary: getBudgetSummary(state)
  }
}

export default connect(mapState)(BudgetSummary);