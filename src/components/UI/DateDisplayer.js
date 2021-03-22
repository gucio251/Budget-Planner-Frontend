import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { modalActions } from 'redux/actions/modalActions';
import { generateCustomDate } from 'components/DashboardDateMenu/DashboardDateMenu';
import styled from 'styled-components';
import {ReactComponent as CalendarIcon} from 'assets/icons/calendarIcon.svg';

const StyledDateDisplayer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 200px;
    background-color: white;
    border-radius: 4px;
    padding: 0 0.5em;
    border-bottom: ${({theme}) => `1px solid ${theme.mainBlue}`};

    & > *:first-child{
        margin-right: 0.5em;
    }

    ${({theme}) => theme.devices.mobile}{
        width: 48.4%;
    }
`

const Text = styled.span`
    color: ${({theme}) => theme.mainBlue};
`

const DateDisplayer = () => {
    const dispatch = useDispatch();
    const datesRangeState = useSelector(state => state.datesRange.datesRange);

    const handleDatePickerOpening = () => {
        dispatch(modalActions.open({ modalType: 'CustomRangePicker' }));
    }

    return (
      <StyledDateDisplayer onClick={handleDatePickerOpening}>
        <CalendarIcon />
        <Text>{generateCustomDate(datesRangeState)}</Text>
      </StyledDateDisplayer>
    );
};

export default DateDisplayer;