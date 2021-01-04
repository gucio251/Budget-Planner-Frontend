import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 45px;
`;

const Header = styled.h1`
  font-size: 48px;
  margin-bottom: 15px;
`

const HeaderTextWithColour = styled.p`
  color: ${({ theme }) => theme.mint};
`;

const InfoText = styled.p`
  font-size: 16px;
`

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
