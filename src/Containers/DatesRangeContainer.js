import {useState, useEffect} from 'react';
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
    const year = currentDate.getFullYear();
    const monthAsString = month + 1;
    const lastDayOfGivenMonth = getLstDayOfMonFnc(new Date(year, monthAsString, currentDate.getDate()));
    const coreDatePart = `${year}-${monthAsString}`;

    return [`${coreDatePart}-01`, `${coreDatePart}-${lastDayOfGivenMonth}`];
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default DatesRangeContainer;