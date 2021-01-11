import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from 'assets/icons/arrowDashboardRight.svg';

const StyledDisplayWindow = styled.section`
  width: 100%;
  height: 100%;
  padding: 2% 2% 0 2%;
  background: white;
`

const StyledHeader = styled.h3`
  font-size: 18px;
  height: 8%;
`

const StyledContent = styled.div`
  height: 80%;
`

const StyledRedirectElement = styled.div`
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #2F54F3;
  font-weight: 500;
  padding-right: 20px;
  cursor: pointer;
`;

const DashboardDisplayWindow = ({ children, title }) => {
  return (
    <StyledDisplayWindow>
      <StyledHeader>
        {title}
      </StyledHeader>
      <StyledContent>
        {children}
      </StyledContent>
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
