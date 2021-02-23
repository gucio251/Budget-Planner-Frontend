import React from 'react';
import {connect} from 'react-redux';
import DashboardOverview from 'components/DashboardOverview/DashboardOverview';
import WelcomeStateDashboard from 'components/WelcomeStateDashboard/WelcomeStateDashboard';
import LoadingInProgress from 'components/LoadingInProgress/LoadingInProgress';

const DashboardOverviewHandling = props => {
    return (
      <>
        {checkIfSingleStatesAreInitialized(props)
          ? renderDashboard(props)
          : renderDashboardLoading()}
      </>
    );
};

const checkIfStateIsInitialized = props => {
  return props.status === 'succedded' ? true : false;
}

const checkIfSingleStatesAreInitialized = props => {
  if (
    checkIfStateIsInitialized(props.incomes) &&
    checkIfStateIsInitialized(props.expenses) &&
    checkIfStateIsInitialized(props.currencies)&&
    checkIfStateIsInitialized(props.incomeTypes)&&
    checkIfStateIsInitialized(props.expenseTypes)
  ) {
    return true;
  } else {
    return false;
  }
}

const renderDashboard = ({ expenses, incomes }) => {
  if (expenses.expenses === null && incomes.incomes === null) {
    return <WelcomeStateDashboard />;
  } else {
    return <DashboardOverview />;
  }
};

const renderDashboardLoading = () => {
  return <LoadingInProgress />
}

DashboardOverviewHandling.propTypes = {
    
};


const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    incomes: state.incomes,
    currencies: state.currencies,
    incomeTypes: state.incomeTypes,
    expenseTypes: state.expenseTypes
  };
};

export default connect(mapStateToProps)(DashboardOverviewHandling);