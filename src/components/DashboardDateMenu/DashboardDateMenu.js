import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import DatesRangeMenu from 'components/DatesRangeMenu/DatesRangeMenu';
import {ReactComponent as CalendarIcon} from 'assets/icons/calendarIcon.svg';

const DateMenuTab = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const Text = styled.span`
  margin-left: 10px;
`
const DashboardDateMenu = () => {
    const datesRangeState = useSelector(state => state.datesRange.datesRange);

    return (
      <>
        <DatesRangeMenu>
          <DateMenuTab tab='Last Month'>Last Month</DateMenuTab>
          <DateMenuTab tab='This Month'>This Month</DateMenuTab>
          <DateMenuTab tab='Custom'>{datesRangeState.option === 'Custom' ? generateCalendarView(datesRangeState): 'Custom'}</DateMenuTab>
        </DatesRangeMenu>
      </>
    );
};

const generateCalendarView = props => {
  return (
    <>
      <CalendarIcon />
      <Text>
        {generateCustomDate(props)}
      </Text>
    </>
  );
}
export const generateCustomDate = ({start, end}) => {
  const [startYear, startMonth, startDay] = start.split('-');
  const endDate = end.split('-').reverse().join('.');

  return `${startDay}.${startMonth} - ${endDate}`
}

export default DashboardDateMenu;