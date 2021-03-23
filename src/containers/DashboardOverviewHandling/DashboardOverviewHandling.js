import React from 'react';
import {connect} from 'react-redux';
import DashboardOverview from 'components/DashboardOverview/DashboardOverview';
import WelcomeStateDashboard from 'components/WelcomeStateDashboard/WelcomeStateDashboard';

const DashboardOverviewHandling = props => {
    return (
      renderDashboard(props)
    );
};

const renderDashboard = ({ expenses, incomes }) => {
  if (expenses.expenses === null && incomes.incomes === null) {
    return <WelcomeStateDashboard />;
  } else {
    return <DashboardOverview />;
  }
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    incomes: state.incomes,
  };
};

export default connect(mapStateToProps)(DashboardOverviewHandling);