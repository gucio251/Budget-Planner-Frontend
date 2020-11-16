import React from 'react';
import PropTypes from 'prop-types';
import DatesRangeMenu from 'components/DatesRangeMenu/DatesRangeMenu'
import TabPane from 'components/UI/TabPane'



const DashboardDateMenu = props => {
    return (
      <DatesRangeMenu>
        <TabPane title="Last Month" />
        <TabPane title="This Month" />
        <TabPane title="Custom" />
      </DatesRangeMenu>
    );
};

DashboardDateMenu.propTypes = {
    
};

export default DashboardDateMenu;