import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleSummaryField from 'components/UI/SingleSummaryField';
import { ReactComponent as BilanceIcon } from 'assets/icons/balanceDashboardIcon.svg';
import { ReactComponent as IncomeIcon } from 'assets/icons/incomeDashboardIcon.svg';
import { ReactComponent as SavingsIcon } from 'assets/icons/savingsDashboardIcon.svg';
import { ReactComponent as ExpensesIcon } from 'assets/icons/expensesDashboardIcon.svg';

const GridBox = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 47% 47%;
  grid-template-rows: 49% 49%;
  grid-gap: 2% 1%;
  &:first-child {
    align-self: center;
  }
`;

const BudgetSummary = ({ expenses, incomes, Icon }) => {
  const incomesSum = getSumOfTransactions(incomes);
  const expensesSum = getSumOfTransactions(expenses);

  return (
    <GridBox>
      <SingleSummaryField amount={incomesSum-expensesSum} name="Balance" Icon={Icon}>
        <BilanceIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={incomesSum} name="Income" Icon={Icon}>
        <IncomeIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={1000} name="Savings" Icon={Icon}>
        <SavingsIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={0 - expensesSum} name="Expenses" Icon={Icon}>
        <ExpensesIcon />
      </SingleSummaryField>
    </GridBox>
  );
};

const getSumOfTransactions = (transactions) => {
  return transactions.reduce((sum, currentTransaction) => {
    return sum + currentTransaction.amount;
  }, 0);
};

BudgetSummary.propTypes = {
  budgetSummary: PropTypes.shape({
    expensesSum: PropTypes.number.isRequired,
    incomesSum: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

export default BudgetSummary;
