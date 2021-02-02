import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { ReactComponent as Arrow } from 'assets/icons/arrowDashboardRight.svg';

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 350px;
  background: white;
  border-radius: 4px;
  padding: 1em;
  gap: 0.5em;
  ${({theme}) => theme.devices.mobile}{
    padding: 0.5em;
  }
`

const StyledHeader = styled.h3`
  position: relative;
  font-weight: 500;
  margin-left: 0.5em;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  padding-bottom: 2em;
`

const StyledRedirectElement = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ComponentWrapper = styled.a`
  position: absolute;
  right: 1em;
  bottom: 1em;
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.mainBlue};
`;

const DashboardDisplayWindow = ({ children, title }) => {
  return (
    <Wrapper>
      <StyledHeader>{title}</StyledHeader>
      <ContentWrapper>
        {children}
      </ContentWrapper>
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
