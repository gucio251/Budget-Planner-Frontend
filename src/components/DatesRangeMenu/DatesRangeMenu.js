import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatesRangeContainer from 'containers/DatesRangeContainer';
import SingleDateMenuOption from 'components/UI/SingleDateMenuOption';
import Modal from 'components/Modal/Modal';
import CustomRangePicker from 'containers/CustomRange/CustomRange';

const StyledMenu = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 140px;
`;

const StyledList = styled.ul`
    display: flex;
    list-style: none;

    & li:not(:last-child){
        margin-right: 16px;
    }
`

const DatesRangeMenu = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpening = () => {
    setModalOpen(true);
  }

  const handleModalClosing = () => {
    setModalOpen(false);
  }
  return (
    <DatesRangeContainer>
      {({ setActiveSettingName, activeRangeName }) => {
        return (
          <>
            <Modal open={modalOpen} handleClose={handleModalClosing}>
              <CustomRangePicker />
            </Modal>
            <StyledMenu>
              <StyledList>
                {children.map((el, i) => {
                  return (
                    <SingleDateMenuOption
                      active={activeRangeName === el.props.title ? true : false}
                      key={i}
                      onClick={() => {
                        setActiveSettingName(el.props.title);
                        if(el.props.title === "Custom"){
                          handleModalOpening(true);
                        }
                      }}
                    >
                      {el.props.display}
                    </SingleDateMenuOption>
                  );
                })}
              </StyledList>
            </StyledMenu>
          </>
        );}}
    </DatesRangeContainer>
  );
};

DatesRangeMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default DatesRangeMenu;