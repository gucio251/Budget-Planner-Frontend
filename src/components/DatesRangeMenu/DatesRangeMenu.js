import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CustomRangePicker from 'containers/CustomRange/CustomRange';
import { datesRangeActions } from 'redux/actions/dateRangeActions';
import Modal from 'components/Modal/Modal';

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
`;

const DatesRangeMenu = ({ children }) => {
  const datesRangeState = useSelector(state => state.datesRange.datesRange);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpening = () => {
    setModalOpen(true);
  }

  const handleModalClosing = () => {
    setModalOpen(false);
  }

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
      <Modal open={modalOpen} handleClose={handleModalClosing}>
        <CustomRangePicker />
      </Modal>
      <DateChangeWrapper>
        <Options>
          {children.map((el, i) => {
            return (
              <Option
                active={datesRangeState.option === el.props.tab ? true : false}
                key={i}
                onClick={() => {
                  el.props.tab === 'Custom' ? handleModalOpening():
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
  const month = currentDate.getMonth() + monthDifferenceFromCurrent;
  const year = currentDate.getFullYear();
  const firstDay = `${year}-${month < 10 ? `0${month + 1}` : month}-01`;
  const lastDay = new Date(year, month + 1, 0);
  return {start: firstDay, end: lastDay.toJSON().slice(0, 10)}
};


DatesRangeMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default DatesRangeMenu;