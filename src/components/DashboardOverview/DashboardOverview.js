import React from 'react';
import { PropTypes } from 'prop-types';

import {
  StyledOverview,
  WelcomeText,
  EmptyDiv,
  StyledDateMenu,
  StyledBudgetSummary,
  StyledGraphArea,
  StyledAllTransactions,
} from './DashboardOverview.styled';

import BudgetSummary from 'containers/BudgetSummary/BudgetSummary';
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';

import FilteredTransactionsContainer from 'containers/FilteredTransactionsContainer/FilteredTransactionsContainer';

const DashboardOverview = () => {
  return (
    <FilteredTransactionsContainer>
      {({ recalculatedExpenses, recalculatedIncomes }) => (
        <StyledOverview>
          <WelcomeText>Hi Caroline, welcome back!</WelcomeText>
          <EmptyDiv />
          <EmptyDiv />
          <StyledDateMenu>
            <DashboardDateMenu />
          </StyledDateMenu>
          <StyledBudgetSummary>
            <BudgetSummary
              expenses={recalculatedExpenses}
              incomes={recalculatedIncomes}
            />
          </StyledBudgetSummary>
          <StyledGraphArea>
            <DashboardDisplayWindow title="Expenses/incomes">
              <GraphAndStatsGroupedByType
                expenses={recalculatedExpenses}
                incomes={recalculatedIncomes}
              />
            </DashboardDisplayWindow>
          </StyledGraphArea>
          <StyledAllTransactions>
            <DashboardDisplayWindow title="Recent transactions">
              <TransactionsDisplayer
                expenses={recalculatedExpenses}
                incomes={recalculatedIncomes}
              />
            </DashboardDisplayWindow>
          </StyledAllTransactions>
        </StyledOverview>
      )}
    </FilteredTransactionsContainer>
  );
};

DashboardOverview.propTypes = {
  handleDatePeriodChange: PropTypes.func.isRequired,
};

export default DashboardOverview;
