import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from 'assets/icons/arrowDashboardRight.svg';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 2% 2% 0 2%;
  background: white;
  border-radius: 4px;
`

const StyledHeader = styled.h3`
  font-size: 18px;
  padding: 0.5em;
`

const StyledRedirectElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #2F54F3;
  font-weight: 500;
  padding: 0 20px 20px 0;
`;

const ComponentWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DashboardDisplayWindow = ({ children, title }) => {
  return (
    <Wrapper>
      <StyledHeader>{title}</StyledHeader>
      {children}
      <StyledRedirectElement>
        <ComponentWrapper>
          See more
          <Arrow />
        </ComponentWrapper>
      </StyledRedirectElement>
    </Wrapper>
  );
};

DashboardDisplayWindow.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardDisplayWindow;
