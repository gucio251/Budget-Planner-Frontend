import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 1.5em 0 3.5em 0;
`;

const Header = styled.h1`
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 0.5em;
  color: ${({ theme }) => theme.dashboardBlack};

  ${({ theme }) => theme.devices.tablet} {
    font-size: 2.5em;
  }

  ${({ theme }) => theme.devices.mobile} {
    font-size: 2em;
  }
`;

const HeaderTextWithColour = styled.p`
  color: ${({ theme }) => theme.mainBlue};
`;

const InfoText = styled.p`
  font-size: 1.2em;
  font-weight: 600;
  color: ${({ theme }) => theme.dashboardBlack};

  ${({ theme }) => theme.devices.mobile} {
    font-size: 0.8em;
  }
`;

const WelcomeText = () => {
  return (
    <Wrapper>
      <Header>
        Welcome to
        <HeaderTextWithColour>
          Budget Planner
        </HeaderTextWithColour>
      </Header>
      <InfoText>
        Keep track of expenses & plan budgets ahead
      </InfoText>
    </Wrapper>
  );
};

export default WelcomeText;
