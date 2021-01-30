import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { expenseTypesActions } from 'redux/actions/expenseTypesActions';
import { currencyActions } from 'redux/actions/currencyActions';
import { incomeTypesActions } from 'redux/actions/incomeTypesActions';
import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';
import Sidebar from './../Sidebar/Sidebar';
import TopToolbar from 'components/Toolbar/Toolbar';

import { Router } from '@reach/router';
import { routes } from 'routes';
import ProtectedRoutes from 'components/ProtectedRoutes/ProtectedRoutes';

import DashboardOverviewHandling from 'containers/DashboardOverviewHandling/DashboardOverviewHandling';
import DashboardReports from 'components/DashboardReports/DashboardReports';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f6f6f8;

  ${({ theme }) => theme.devices.mobile} {
    padding: 1em 0.5em;
  }
`;

const StyledDashboard = styled.div`
  height: 100vh;
  overflow-y: auto;

  ${({ theme }) => theme.devices.tablet} {
    height: 100%;
  }
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
    <Wrapper>
      <StyledDashboard>
        <Sidebar />
        <TopToolbar />
        <Router>
          <DashboardOverviewHandling path='/' />
          <DashboardReports
            path='reports'
          />
        </Router>
      </StyledDashboard>
    </Wrapper>
  );
};

export default Dashboard;
