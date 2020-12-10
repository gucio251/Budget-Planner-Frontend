import React, {useEffect, useState} from 'react';
import {connect, } from 'react-redux';
import {filteredTransactions} from 'redux/actions/filteredTransactionsActions'
import {filterTransactionsByDates} from 'Utils/functions';
import PropTypes from 'prop-types';
import DashboardOverview from 'components/DashboardOverview/DashboardOverview'

const DashboardOverviewHandling = props => {
    return (
      <>
        {checkIfSingleStatesAreInitialized(props)
          ? renderDashboard(props)
          : renderDashboardLoading(props)}
      </>
    );
};

const checkIfStateisInitialized = props => {
  return props.status === 'succedded' ? true : false;
}

const checkIfSingleStatesAreInitialized = props => {
  if(checkIfStateisInitialized(props.incomes) && checkIfStateisInitialized(props.expenses)){
    return true;
  }else{
    return false;
  }
}

const checkIfChosenTimePeriodsAreEqual = props => {
  const {datesRange, filteredTransactions} = props;
  const startDatesEqual = datesRange.datesRange.start === filteredTransactions.datesRange.start;
  const endDatesEqual = datesRange.datesRange.end === filteredTransactions.datesRange.end;

  return startDatesEqual && endDatesEqual ? true : false;
}

const recalculateTransactionsInGivenTimeFrame =  props => {
  const filteredIncomes = filterTransactionsByDates(props.incomes.incomes, props.datesRange.datesRange);
  const filteredExpenses = filterTransactionsByDates(props.expenses.expenses, props.datesRange.datesRange);
  props.loadFilteredTransactions({transactions: [].concat(filteredExpenses, filteredIncomes), datesRange: props.datesRange.datesRange});
}
const renderDashboard = props => {
  if (!checkIfChosenTimePeriodsAreEqual(props)) {
    recalculateTransactionsInGivenTimeFrame(props);
  }

  return(
      <DashboardOverview handleDatePeriodChange={recalculateTransactionsInGivenTimeFrame}/>
    )
}


const renderDashboardLoading = props => {
  return (
    <>

    </>
  )
}

DashboardOverviewHandling.propTypes = {
    
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFilteredTransactions: (transactions) => dispatch(filteredTransactions.load(transactions))
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    incomes: state.incomes,
    datesRange: state.datesRange,
    filteredTransactions: state.filteredTransactions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOverviewHandling);