import React, {useState, useContext} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from 'components/UI/Button';
import { datesRangeActions } from 'redux/actions/dateRangeActions';
import DayPicker, {DateUtils} from 'react-day-picker/DayPicker';
import { ModalContext } from 'components/Modal/Modal';
import {Navbar} from 'components/UI/SingleMonthDatePicker'
import { ReactComponent as CloseFormSign } from 'assets/icons/closeSign.svg';

const StyledContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: #f8f9fb;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  width: min(40em, 100%);
  overflow-y: auto;
  max-height: 100%;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3em;
  font-weight: 500;
`
const StyledCloseFormSign = styled(CloseFormSign)`
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const InputFieldsWrapper = styled.div`
  margin-top: 1em;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(240px, 1fr)
  );
  grid-gap: 25px;
`;

const InputControl = styled.div`
  position: relative;
  width: 100%;
`
const LabelWrapper = styled.label`
  position: absolute;
  top: -1.2em;
  font-size: 0.85em;
  font-weight: normal;
`

const InputField = styled.input`
  height: 40px;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 4px;
  padding-left: 1em;
`

const Wrapper = styled.div`
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CustomRange = () => {
    const dispatch = useDispatch();
    const modal = useContext(ModalContext);
    const [datesRange, setDatesRange] = useState({
      from: undefined,
      to: undefined,
    });

    const checkIfButtonShallBeDisabled = () => {
      return (datesRange.from == undefined || datesRange.to == undefined) ? true : false;
    }

    const handleDayClick = (day) => {
      const range = DateUtils.addDayToRange(day, datesRange);
      setDatesRange(range)
    }
    const submitDateRangeChange = () => {
      dispatch(
        datesRangeActions.setDateRange({
          start: convertToString(datesRange.from),
          end: convertToString(datesRange.to),
          option: 'Custom',
        })
      );
      modal.handleClose();
    }
    return (
      <StyledContent>
        <StyledRow>
          Custom range
          <StyledCloseFormSign onClick={modal.handleClose} />
        </StyledRow>
        <InputFieldsWrapper>
          <InputControl>
            <LabelWrapper>From</LabelWrapper>
            <InputField
              value={
                datesRange.from != null
                  ? calculateVisibleDate(datesRange.from)
                  : null
              }
            />
          </InputControl>
          <InputControl>
            <LabelWrapper>To</LabelWrapper>
            <InputField
              value={
                datesRange.to != null
                  ? calculateVisibleDate(datesRange.to)
                  : null
              }
            />
          </InputControl>
        </InputFieldsWrapper>
        <Wrapper>
          <DayPicker
            className="Selectable"
            numberOfMonths={2}
            onDayClick={handleDayClick}
            selectedDays={[
              datesRange.from,
              { from: datesRange.from, to: datesRange.to },
            ]}
            modifiers={{ start: datesRange.from, end: datesRange.to }}
            navbarElement={<Navbar />}
          />
        </Wrapper>
        <ButtonWrapper>
          <Button
            disabled={checkIfButtonShallBeDisabled()}
            onClick={submitDateRangeChange}
          >
            Save
          </Button>
        </ButtonWrapper>
      </StyledContent>
    );
};

const convertToString = date => {
  return date.toISOString().slice(0, 10);
}
const calculateVisibleDate = date => {
  const dateString = convertToString(date);
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

export default CustomRange;