import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleSummaryField from 'components/UI/SingleSummaryField';
import { ReactComponent as BilanceIcon } from 'assets/icons/balanceDashboardIcon.svg';
import { ReactComponent as IncomeIcon } from 'assets/icons/incomeDashboardIcon.svg';
import { ReactComponent as ExpensesIcon } from 'assets/icons/expensesDashboardIcon.svg';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 48.5% 48.5%;
  grid-template-rows: 49% 49%;
  grid-template-areas:
    'balance balance'
    'income expense';
  grid-gap: 2% 1%;
  &:first-child {
    align-self: center;
  }

  ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 49.5% 49.5%;
  }
`;

const BalanceWrapper = styled.div`
  grid-area: balance;
`

const BudgetSummary = ({ expenses, incomes, Icon }) => {
  const incomesSum = getSumOfTransactions(incomes);
  const expensesSum = getSumOfTransactions(expenses);

  return (
    <Wrapper>
      <BalanceWrapper>
        <SingleSummaryField
          amount={incomesSum - expensesSum}
          name="Balance"
          Icon={Icon}
        >
          <BilanceIcon />
        </SingleSummaryField>
      </BalanceWrapper>
      <SingleSummaryField amount={incomesSum} name="Income" Icon={Icon}>
        <IncomeIcon />
      </SingleSummaryField>
      <SingleSummaryField amount={0 - expensesSum} name="Expenses" Icon={Icon}>
        <ExpensesIcon />
      </SingleSummaryField>
    </Wrapper>
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
