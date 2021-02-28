import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { datesRangeActions } from 'redux/actions/dateRangeActions';
import { modalActions } from 'redux/actions/modalActions';

const DateChangeWrapper = styled.nav`
  display: flex;
`;

const Options = styled.ul`
  display: flex;

  ${({ theme }) => theme.devices.mobile} {
    &>*:first-child{
      display: none;
    }
  }
`;

const Option = styled.li`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background: ${({ active }) => (active ? '#E5E7FA' : null)};
  color: ${({ active }) => (active ? '#2F54F3' : '#d0c9d6')};
  border-bottom: ${({ active, theme }) =>
    active ? `1px solid ${theme.mainBlue}` : null};
  border-radius: 4px;
  font-size: 1em;
  padding: 0.5em 1.5em;

  ${({ theme }) => theme.devices.tablet} {
    padding: 0.5em 1.0em;
  }

  ${({ theme }) => theme.devices.tablet} {
    font-size: 0.8em;
  }
`;

const DatesRangeMenu = ({ children }) => {
  const datesRangeState = useSelector(state => state.datesRange.datesRange);
  const dispatch = useDispatch();

  const getDateRangeBasedOnOptionChosen = (optionChosen) => {
    switch (optionChosen) {
      case 'This Month':
        return {
          ...calculateMonthBeginningAndEnd(),
          option: optionChosen
        };
      case 'Last Month':
        return {
          ...calculateMonthBeginningAndEnd(-1),
          option: optionChosen,
        };
      default:
        break;
    }
  };
  return (
    <>
      <DateChangeWrapper>
        <Options>
          {children.map((el, i) => {
            return (
              <Option
                active={datesRangeState.option === el.props.tab ? true : false}
                key={i}
                onClick={() => {
                  el.props.tab === 'Custom' ? dispatch(modalActions.open({modalType: 'CustomRangePicker'})):
                  dispatch(
                    datesRangeActions.setDateRange(
                      getDateRangeBasedOnOptionChosen(el.props.tab)
                    )
                  );
                }}
              >
                {el}
              </Option>
            );
          })}
        </Options>
      </DateChangeWrapper>
    </>
  );
};

export const calculateMonthBeginningAndEnd = (
  monthDifferenceFromCurrent = 0
) => {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let calculatedMonthWithDifference = currentMonth + monthDifferenceFromCurrent;
  const withinTheSameYear = calculatedMonthWithDifference >= 1 && calculatedMonthWithDifference <= 12;

  if(!withinTheSameYear){
    const yearsDifference = Math.floor(calculatedMonthWithDifference/12);
    year = year + yearsDifference;
    currentMonth =
      calculatedMonthWithDifference < 0
        ? 12 + (calculatedMonthWithDifference % 12)
        : 0 + (calculatedMonthWithDifference % 12);
  }else{
    currentMonth= calculatedMonthWithDifference;
  }

  const lastDay = new Date(year, currentMonth, 0).getDate();
  const monthAsString = `${currentMonth < 10 ? `0${currentMonth}` : currentMonth}`;
  const monthBeginning = `${year}-${monthAsString}-01`;
  const monthEnd = `${year}-${monthAsString}-${lastDay}`;
  return { start: monthBeginning, end: monthEnd};
};


DatesRangeMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default DatesRangeMenu;