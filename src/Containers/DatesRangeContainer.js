import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {datesRangeActions} from 'redux/actions/dateRangeActions'

const getLstDayOfMonFnc = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
};

const possibleOptionNames = {
    lastMonth: "Last Month",
    thisMonth: "This Month",
    custom: "Custom"
}

const returnDatesRangeForGivenMonth = (month) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const lastDayOfGivenMonth = getLstDayOfMonFnc(new Date(currentYear, month+1, currentDate.getDate()));
    const finishDate = new Date(currentYear, month, lastDayOfGivenMonth);
    const startDate = new Date(currentYear, month, 1);

    return [startDate, finishDate];
}

const getDateRangeBasedOnOptionChosen = (optionChosen) => {
    const todaysDate = new Date();
    switch(optionChosen){
        case possibleOptionNames.thisMonth:
            return returnDatesRangeForGivenMonth(todaysDate.getMonth());
        case possibleOptionNames.lastMonth:
            return returnDatesRangeForGivenMonth(todaysDate.getMonth() - 1);
        default:
            break;
    }
}

const DatesRangeContainer = ({children}) => {
    const dispatch = useDispatch();
    const [activeSettingName, setActiveSettingName] = useState(possibleOptionNames.thisMonth)
    const [datesRange, setDatesRange] = useState(possibleOptionNames.thisMonth);

    const handleUpdateDatesRange = (startingDate, finishingDate) => {
        setDatesRange({start: startingDate, end: finishingDate});
    }

    useEffect(()=> {
        const [startDay, finishDay] = getDateRangeBasedOnOptionChosen(activeSettingName);
        handleUpdateDatesRange(startDay, finishDay);
    },[activeSettingName])

    useEffect(() => {
        dispatch(datesRangeActions.setDateRange(datesRange));
    }, [datesRange]);

    return children({
        setActiveSettingName,
        activeSettingName
    })

};

DatesRangeContainer.propTypes = {
    children: PropTypes.element.isRequired
};

export default DatesRangeContainer;