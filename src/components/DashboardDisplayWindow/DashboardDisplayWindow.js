import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from 'assets/icons/arrowDashboardRight.svg';

const StyledDisplayWindow = styled.section`
  position: relative;
  width: 100%;
  padding: 2% 2% 0 2%;
  background: white;
`

const StyledHeader = styled.h3`
  font-size: 18px;
  padding: 0.5em;
`

const StyledRedirectElement = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #2F54F3;
  font-weight: 500;
  padding: 0 20px 20px 0;
  cursor: pointer;
`;

const DashboardDisplayWindow = ({ children, title }) => {
  return (
    <StyledDisplayWindow>
      <StyledHeader>
        {title}
      </StyledHeader>
      {children}
      <StyledRedirectElement>
        See more
        <Arrow />
      </StyledRedirectElement>
    </StyledDisplayWindow>
  );
};

DashboardDisplayWindow.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardDisplayWindow;
