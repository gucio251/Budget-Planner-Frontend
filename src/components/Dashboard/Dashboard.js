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
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    'sidebar toolbar'
    'sidebar dashboardMain';
  background-color: #f6f6f8;

  ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 100px 1fr;
    grid-template-rows: 70px 1fr;
  }
`;
const StyledToolbar = styled.div`
  grid-area: toolbar;
`;
const StyledReportsSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledSideBar = styled.div`
  grid-area: sidebar;
`;

const StyledDashboardOverview = styled.div`
  grid-area: dashboardMain;
  margin: 10px 40px 30px 30px;
  height: 100vh;
  padding-bottom: 130px;
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
      <StyledSideBar>
        <Sidebar />
      </StyledSideBar>
      <StyledReportsSide>
        <StyledToolbar>
          <TopToolbar />
        </StyledToolbar>
        <StyledDashboardOverview>
          <DashboardOverviewHandling />
        </StyledDashboardOverview>
      </StyledReportsSide>
    </StyledDashboard>
  );
};

export default Dashboard;
