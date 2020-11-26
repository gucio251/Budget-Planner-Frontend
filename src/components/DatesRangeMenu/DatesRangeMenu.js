import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatesRangeContainer from 'containers/DatesRangeContainer';
import SingleDateMenuOption from 'components/UI/SingleDateMenuOption'

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

const DatesRangeMenu = ({children}) => {
    return (
      <DatesRangeContainer>
        {({setActiveSettingName, activeSettingName}) => (
          <StyledMenu>
            <StyledList>
              {children.map((el, i) => {
                return (
                  <SingleDateMenuOption
                    active={activeSettingName === el.props.title ? true : false}
                    key={i}
                    onClick={()=> setActiveSettingName(el.props.title)}
                >
                    {el.props.title}
                  </SingleDateMenuOption>
                );
              })}
            </StyledList>
          </StyledMenu>
        )}
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