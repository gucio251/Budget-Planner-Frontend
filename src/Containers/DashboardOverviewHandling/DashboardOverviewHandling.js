import React, {useeffect} from 'react';
import {connect, } from 'react-redux';
import {
  filterTransactionsByDates,
  sortTransactionsByChosenProperty,
} from 'Utils/functions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import DashboardOverview from 'components/DashboardOverview/DashboardOverview'



const DashboardOverviewHandling = props => {
    return (
      <>
        {checkIfSingleStatesAreInitialized(props)
          ? renderDashboard()
          : renderDashboardLoading(props)}
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
    checkIfStateIsInitialized(props.currencies)
  ) {
    return true;
  } else {
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
  const sortedTransactions = sortTransactionsByChosenProperty([].concat(filteredExpenses, filteredIncomes), 'transaction_date');
  return recalculateTransactionsForActiveCurrency({transactions: sortedTransactions, currencies: props.currencies});
}

const recalculateTransactionsForActiveCurrency = ({transactions, currencies}) => {
  return transactions.map(transaction => {
    if(transaction.currency === currencies.active){
      return transaction;
    }else{
      return {
        ...transaction,
        currency: currencies.active,
        amount: transaction.amount / currencies.rates[transaction.currency],
      };
    }
  })
}

const getSumsOfTransactions = transactions => {
  const sumsOfTransactions = transactions.reduce((summary, {type, amount}) => {
    if(type === 'income'){
      return {
        ...summary,
        incomesSum: summary.incomesSum+amount}
    }else{
      return {
        ...summary,
        expensesSum: summary.expensesSum+amount
      }
    }
  }, {incomesSum:0, expensesSum:0})

  return {
    ...sumsOfTransactions,
    balance: sumsOfTransactions.incomesSum - sumsOfTransactions.expensesSum
  }
}

const renderDashboard = () => {
  return <DashboardOverview />
}

const renderBudgetSummary = props => {
  return (
    <>sdsdsa</>
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


const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    incomes: state.incomes,
    currencies: state.currencies
  };
};

export default connect(mapStateToProps)(DashboardOverviewHandling);