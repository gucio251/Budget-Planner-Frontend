import React from 'react';
import {useSelector} from 'react-redux';

import DatesRangeMenu from 'components/DatesRangeMenu/DatesRangeMenu'
import TabPane from 'components/UI/TabPane'

const DashboardDateMenu = () => {
    const datesRangeState = useSelector(state => state.datesRange);

    const generateTitle = () => {
      return datesRangeState.datesRange.hasOwnProperty("custom") === true
      ? generateCustomDate(datesRangeState.datesRange)
      : "Custom"
    }

    return (
      <>
        <DatesRangeMenu>
          <TabPane title="Last Month" display="Last Month" />
          <TabPane title="This Month" display="This Month" />
          <TabPane title="Custom" display={generateTitle()} />
        </DatesRangeMenu>
      </>
    );
};

const generateCustomDate = ({start, end}) => {
  const [startYear, startMonth, startDay] = start.split('-');
  const endDate = end.split('-').reverse().join('.');

  return `${startDay}.${startMonth} - ${endDate}`
}

export default DashboardDateMenu;