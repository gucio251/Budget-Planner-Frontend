import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleSummaryField from 'components/UI/SingleSummaryField';
import { ReactComponent as BilanceIcon } from 'assets/icons/balanceDashboardIcon.svg';
import { ReactComponent as IncomeIcon } from 'assets/icons/incomeDashboardIcon.svg';
import { ReactComponent as ExpensesIcon } from 'assets/icons/expensesDashboardIcon.svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > *:not(:last-child) {
    margin-bottom: 0.5em;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  height: 100%;

  & > *:not(:first-child) {
    margin-left: 0.5em;
  }

  ${({ theme }) => theme.devices.mobile} {
    display: block;

    & > *:not(:first-child) {
      margin-left: 0;
    }

    & > *:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }
`;

const BudgetSummary = ({ expenses, incomes, Icon }) => {
  const incomesSum = getSumOfTransactions(incomes);
  const expensesSum = getSumOfTransactions(expenses);

  return (
    <Wrapper>
      <RowWrapper>
        <SingleSummaryField
          amount={incomesSum - expensesSum}
          name="Balance"
          Icon={Icon}
        >
          <BilanceIcon />
        </SingleSummaryField>
      </RowWrapper>
      <RowWrapper>
        <SingleSummaryField amount={incomesSum} name="Income" Icon={Icon}>
          <IncomeIcon />
        </SingleSummaryField>
        <SingleSummaryField
          amount={0 - expensesSum}
          name="Expenses"
          Icon={Icon}
        >
          <ExpensesIcon />
        </SingleSummaryField>
      </RowWrapper>
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
