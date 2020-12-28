import React, {useState, useContext} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from 'components/UI/Button';
import { ReactComponent as CloseFormSign } from 'assets/icons/closeSign.svg';
import { datesRangeActions } from 'redux/actions/dateRangeActions';
import { ModalContext } from 'components/Modal/Modal';
import RangeDatePicker from 'components/UI/RangeDatePicker/RangeDatePicker';

import { convertDateToString } from 'Utils/functions';

const StyledContent = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10% 80% 10%;
  grid-template-areas:
    'header header'
    '. .'
    '. footer';
  left: 30%;
  top: 15%;
  height: 70%;
  width: 700px;
  background-color: #f8f9fb;
  padding: 25px;
`;

const StyledHeader = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
`
const StyledCloseFormSign = styled(CloseFormSign)`
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 30px 0 30px;
`

const CustomRange = () => {
    const dispatch = useDispatch();
    const modal = useContext(ModalContext);
    const [datesRange, setDatesRange] = useState({
      startDate: null,
      endDate: null,
    });

    const checkIfButtonShallBeDisabled = () => {
      return (datesRange.startDate == null || datesRange.endDate == null) ? true : false;
    }

    const submitDateRangeChange = () => {
      const startDate = convertDateToString(datesRange.startDate._d);
      const endDate = convertDateToString(datesRange.endDate._d);
      dispatch(
        datesRangeActions.setDateRange({
          start: startDate,
          end: endDate,
          custom: true
        })
      );
      modal.handleClose();
    }
    return (
      <StyledContent>
        <StyledHeader>
          Custom range
          <StyledCloseFormSign onClick={modal.handleClose}/>
        </StyledHeader>
        <RangeDatePicker {...datesRange} updateRange={setDatesRange} />
        <ButtonWrapper>
          <Button
            color="#1665D8"
            disabled={checkIfButtonShallBeDisabled()}
            onClick={submitDateRangeChange}
          >
            Save
          </Button>
        </ButtonWrapper>
      </StyledContent>
    );
};


CustomRange.propTypes = {
    
};

export default CustomRange;