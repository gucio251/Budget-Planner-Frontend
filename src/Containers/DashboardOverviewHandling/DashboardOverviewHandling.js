import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

const DashboardOverviewHandling = props => {
    console.log(props);
    return (
        <div>
            
        </div>
    );
};

DashboardOverviewHandling.propTypes = {
    
};

const mapStateToProps = (state) => {
  return {
    expenseTypes: state.expenseTypes.expenseTypes,
    incomeTypes: state.incomeTypes.incomeTypes,
    datesRange: state.datesRange.datesRange,
  };
};

export default connect(mapStateToProps)(DashboardOverviewHandling);