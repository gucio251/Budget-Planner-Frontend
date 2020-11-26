import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { filterTransactionsByDates } from 'Utils/functions';
import {ReactComponent as BilanceIcon} from 'assets/icons/balanceDashboardIcon.svg';
import { ReactComponent as IncomeIcon } from 'assets/icons/incomeDashboardIcon.svg';
import { ReactComponent as SavingsIcon } from 'assets/icons/savingsDashboardIcon.svg';
import { ReactComponent as ExpensesIcon } from 'assets/icons/expensesDashboardIcon.svg';

import SingleSummaryField from 'components/UI/SingleSummaryField'

const Wrapper = styled.div`
    width: 96%;
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 21px;
`

const Row = styled.div`
    display: flex;
    flex-flow: row;
    gap: 21px;
`

const BudgetSummary = ({ budgetSummary }) => {
  const {expensesSum, incomesSum, balance} = budgetSummary;
  return (
    <Wrapper>
      <Row>
        <SingleSummaryField amount={balance} name="Balance">
          <BilanceIcon />
        </SingleSummaryField>
        <SingleSummaryField amount={incomesSum} name="Income">
          <IncomeIcon />
        </SingleSummaryField>
      </Row>
      <Row>
        <SingleSummaryField amount={1000} name="Savings">
          <SavingsIcon />
        </SingleSummaryField>
        <SingleSummaryField amount={0 - expensesSum} name="Expenses">
          <ExpensesIcon />
        </SingleSummaryField>
      </Row>
    </Wrapper>
  );
};

BudgetSummary.propTypes = {
  budgetSummary: PropTypes.shape({
    expensesSum: PropTypes.number.isRequired,
    incomesSum: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

const getBudgetSummary = createSelector(
  (state) => state.expenses.expenses,
  (state) => state.incomes.incomes,
  (state) => state.datesRange.datesRange,
  (expenses, incomes, datesRange) => {
    const filteredExpenses = filterTransactionsByDates(expenses, datesRange);
    const filteredIncomes = filterTransactionsByDates(incomes, datesRange);

    const expensesSum = filteredExpenses.reduce((sum, currentTransaction) => {
      return sum + currentTransaction.amount;
    },0);

    const incomesSum = filteredIncomes.reduce((sum, currentTransaction) => {
      return sum + currentTransaction.amount;
    }, 0);

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