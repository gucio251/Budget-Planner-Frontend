import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";


const myCustomLocale = {
  // months list by order
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Monday',
      short: 'M',
    },
    {
      name: 'Tuesday',
      short: 'T',
    },
    {
      name: 'Wednesday',
      short: 'W',
    },
    {
      name: 'Thursday',
      short: 'T',
    },
    {
      name: 'Friday',
      short: 'F',
    },
    {
      name: 'Saturday',
      short: 'S',
      isWeekend: true,
    },
    {
      name: 'Sunday',
      short: 'S',
      isWeekend: true,
    }
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',

  // for input range value
  from: 'from',
  to: 'to',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

const CustomDatePicker = ({name, onChange, value, handleBlur}) => {
  if (Object.prototype.toString.call(value) !== '[object Object]'){
    if (value.includes('-')) {
      const [year, month, day] = value.split('-');
      value = {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
      };
    }
  }

    const [selectedDate, setSelectedDate] = useState(value);

    const renderCustomInput = ({ ref }) => (
      <input
        readOnly
        ref={ref}
        name={name}
        value={`${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`}
        onBlur={handleBlur}
        style={{
          display: 'flex',
          height: '40px',
          width: '100%',
          border: '1px solid #D3D7DB',
          backgroundColor: 'white',
          borderRadius: '5px',
          outline: 'none',
          fontSize: '16px',
          color: '#1C245D',
          paddingLeft: '8px',
          zIndex: '0',
        }}
      />
    );

    return (
        <DatePicker
          selected={value}
          onChange={(val) => {
            setSelectedDate(val)
            const finalMonthValue = val.month.toString().length === 1 ? `0${val.month}` : val.month;
            onChange(name, `${val.year}-${finalMonthValue}-${val.day}`);
          }}
          value={selectedDate}
          renderInput={renderCustomInput}
          colorPrimary="#03DAC5"
          calendarTodayClassName="custom-today-day"
          name={name}
          locale={myCustomLocale}
        />
    );
};

CustomDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}

export default CustomDatePicker;