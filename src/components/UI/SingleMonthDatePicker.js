import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import DayPicker from 'react-day-picker/DayPicker';
import 'react-day-picker/lib/style.css';
import { ReactComponent as RightChevron } from 'assets/icons/rightChevronDatePicker.svg';
import InputWithBorder from 'components/UI/InputWithBorder';

const Wrapper = styled.div`
    position: relative;
`
const CalendarWrapper = styled.div`
    position: absolute;
    bottom: 50px;
    left: 12.5%;
    display: ${({active}) => active ? 'block' : 'none'};
`

function Navbar({
  onPreviousClick,
  onNextClick,
  className,
}) {
  const styleLeft = {
    position: 'absolute',
    left: '0',
    marginTop: '1.1em',
    marginLeft: '1.1em',
    cursor: 'pointer',
  };
  const styleRight = {
    position: 'absolute',
    right: '0',
    marginTop: '1.1em',
    marginRight: '1.1em',
    cursor: 'pointer',
  };

  const rotate = {
    transform: 'rotate(180deg)',
  };

  return (
    <div className={className}>
      <div style={styleLeft} onClick={() => onPreviousClick()}>
        <RightChevron style={rotate}/>
      </div>
      <div style={styleRight} onClick={() => onNextClick()}>
        <RightChevron />
      </div>
    </div>
  );
}

const DatePicker = ({ name, value, onChange }) => {
    const [isInputFocused, setInputFocused] = useState(false);
    const calendarRef= useRef(null)

    const handleChange = (val) => {
      onChange(name, val.toISOString().slice(0, 10));
    };

    const handleClickOutside = (e) => {
        if(isInputFocused === true && !calendarRef.current.contains(e.target)){
            setInputFocused(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside)
    })
    return (
      <>
        <Wrapper ref={calendarRef}>
          <InputWithBorder name={name} onFocus={() => setInputFocused(true)} />
          <CalendarWrapper active={isInputFocused}>
            <DayPicker
              name={name}
              value={value}
              navbarElement={<Navbar />}
              firstDayOfWeek={1}
              onDayClick={handleChange}
              selectedDays={new Date(value)}
              weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            />
          </CalendarWrapper>
        </Wrapper>
      </>
    );
}

export default DatePicker;