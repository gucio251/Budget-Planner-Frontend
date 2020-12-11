import React from 'react';
import {PropTypes} from 'prop-types'
import styled from 'styled-components';

import BudgetSummary from 'containers/BudgetSummary/BudgetSummary';
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';

const EmptyDiv = styled.div`
  grid-area: 'emptySpace';
`

const StyledOverview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 48px 330px 375px;
  grid-template-areas:
    'welcomeTextArea dateMenu'
    'budgetSummary graphs'
    'aa aa';
  row-gap: 10px;
`;

const WelcomeText = styled.span`
  grid-area: welcomeTextArea;
  font-size: 32px;
  font-weight: bold;
  padding: 0 5%;
  margin-top: 0;
`;

const StyledDateMenu = styled.div`
  grid-area: dateMenu;
`

const StyledBudgetSummary = styled.div`
  grid-area: budgetSummary;
`

const StyledGraphArea = styled.div`
  grid-area: graphs;
`

const StyledAllTransactions = styled.div`
  grid-area: aa;
`;

const DashboardOverview = ({ handleDatePeriodChange }) => {
  return (
    <StyledOverview>
      <WelcomeText>Hi Caroline, welcome back!</WelcomeText>
      <EmptyDiv />
      <EmptyDiv />
      <StyledDateMenu>
        <DashboardDateMenu
          handleDatePeriodChange
        />
      </StyledDateMenu>
      <StyledBudgetSummary>
        <BudgetSummary />
      </StyledBudgetSummary>
      <StyledGraphArea>
        <DashboardDisplayWindow title="Expenses/incomes">
          <GraphAndStatsGroupedByType />
        </DashboardDisplayWindow>
      </StyledGraphArea>
      <StyledAllTransactions>
        <DashboardDisplayWindow title="Recent transactions">
          <TransactionsDisplayer />
        </DashboardDisplayWindow>
      </StyledAllTransactions>
    </StyledOverview>
  );
};

DashboardOverview.propTypes = {
  handleDatePeriodChange: PropTypes.func.isRequired
};

export default DashboardOverview;