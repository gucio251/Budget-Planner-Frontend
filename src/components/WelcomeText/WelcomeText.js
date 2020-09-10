import React from "react";
import styled from "styled-components";

const StyledWelcomeTextWrapper = styled.div`
  margin-bottom: 35px;
  font-size: 48px;
  font-weight: bold;

  ${({ theme }) => theme.devices.tablet}{
    font-size: 34px;
    margin-top: 70px;
  }

  ${({theme}) => theme.devices.mobile}{
    font-size: 24px;
    width: 50vw;
  }
`;

const StyledWelcomeText = styled.p`

`

const StyledAppName = styled.p`
  color: ${({theme}) => theme.mint};
`

const StyledAppPurpose = styled.span`
  font-size: 16px;
  font-weight: normal;
`

const WelcomeText = () => {
  return (
    <StyledWelcomeTextWrapper>
      <StyledWelcomeText>
        Welcome to
      </StyledWelcomeText>
      <StyledAppName>
        Budget Planner
      </StyledAppName>
      <StyledAppPurpose>
        Keep track of expenses & plan budgets ahead
      </StyledAppPurpose>
    </StyledWelcomeTextWrapper>
  );
};

export default WelcomeText;
