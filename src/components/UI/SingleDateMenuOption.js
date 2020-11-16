import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOption = styled.li`
  color: ${({ active, theme }) => (active === true ? '#2F54F3' : '#8B91A3')};
  padding: 12px 6px;
  background: ${({ active }) => (active === true ? '#E5E7FA' : '#F6F6F8')};
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
`;

const SingleDateMenuOption = ({children, active, onClick}) => {
    return (
        <StyledOption active={active} onClick={onClick}>
            {children}
        </StyledOption>
    );
};

SingleDateMenuOption.propTypes = {
    
};

export default SingleDateMenuOption;