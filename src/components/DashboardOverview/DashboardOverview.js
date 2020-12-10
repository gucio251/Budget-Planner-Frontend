import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType';
import Modal from 'components/Modal/Modal';

import Button from 'components/UI/Button';
import { ModalContext } from 'components/Modal/Modal';
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';
import BudgetSummary from 'containers/BudgetSummary/BudgetSummary';
import DashboardMenu from 'components/Toolbar/Toolbar';

import { getTodaysDate } from 'Utils/functions';
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';

import DashboardOverviewHandling from 'containers/DashboardOverviewHandling/DashboardOverviewHandling';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    backgroundColor: '#F6F6F8',
    paddingRight: '3%',
  },
  firstRow: {
    maxHeight: 500
  },
  firstRowChild: {
    height: '100%'
  }
});

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

const initialValues = {
  amount: 0,
  currency: '',
  currency_id: '',
  category: '',
  subcategory: '',
  category_id: '',
  transaction_date: getTodaysDate(),
  comments: '',
}

const DashboardOverview = props => {
    const classes=useStyles()
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <StyledOverview>
        <WelcomeText>Hi Caroline, welcome back!</WelcomeText>
        <EmptyDiv />
        <EmptyDiv />
        <StyledDateMenu>
          <DashboardDateMenu
            handleDatePeriodChange={props.handleDatePeriodChange}
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
    
};

export default DashboardOverview;