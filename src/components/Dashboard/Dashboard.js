import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { expenseTypesActions } from 'redux/actions/expenseTypesActions';
import { currencyActions } from 'redux/actions/currencyActions';
import { incomeTypesActions } from 'redux/actions/incomeTypesActions';
import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';
import { Sidebar } from './../Sidebar/Sidebar';
import TopToolbar from 'components/Toolbar/Toolbar';

import DashboardOverviewHandling from 'containers/DashboardOverviewHandling/DashboardOverviewHandling';

const StyledDashboard = styled.div`
  background-color: #f6f6f8;
  height: 100%;
  overflow: auto;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(expenseTypesActions.load());
    dispatch(incomeTypesActions.load());
    dispatch(currencyActions.loadCurrencies());
    dispatch(expensesActions.load());
    dispatch(incomesActions.load());
    dispatch(currencyActions.loadRatesFromApi());
  }, [dispatch]);

  return (
    <StyledDashboard>
      <Sidebar />
      <TopToolbar />
      <DashboardOverviewHandling />
    </StyledDashboard>
  );
};

export default Dashboard;
