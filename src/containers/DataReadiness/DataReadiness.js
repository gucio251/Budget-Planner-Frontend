import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const DataReadiness = props => {
    return props.children({
        dataReadiness: checkIfSingleStatesAreInitialized(props)
    })
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

DataReadiness.propTypes = {
    children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  expenses: PropTypes.array,
  incomes: PropTypes.array,
  incomeTypes: PropTypes.object,
  expenseTypes: PropTypes.object,
  currencies: PropTypes.object
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

export default connect(mapStateToProps)(DataReadiness);