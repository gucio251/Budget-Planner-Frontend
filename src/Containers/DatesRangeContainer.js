import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types';
import {datesRangeActions} from 'redux/actions/dateRangeActions';

const getLstDayOfMonFnc = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
};

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
        case "This Month":
            return returnDatesRangeForGivenMonth(todaysDate.getMonth());
        case "Last Month":
            return returnDatesRangeForGivenMonth(todaysDate.getMonth() - 1);
        default:
            break;
    }
}

const DatesRangeContainer = ({ children }) => {
  const dispatch = useDispatch();
  const [activeRangeName, setActiveRangeName] = useState();

  const setActiveSettingName = (name) => {
    setActiveRangeName(name);
    if(name !== "Custom"){
      const [startDay, finishDay] = getDateRangeBasedOnOptionChosen(name);
      dispatch(
        datesRangeActions.setDateRange({ start: startDay, end: finishDay })
      );
    }
  };

  useEffect(() => {
    setActiveSettingName('This Month');
  }, []);

  return children({
    setActiveSettingName,
    activeRangeName,
  });
};

DatesRangeContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};


export default DatesRangeContainer;