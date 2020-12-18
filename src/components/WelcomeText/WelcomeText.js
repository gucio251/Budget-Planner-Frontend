import React from "react";
import styled from "styled-components";
<<<<<<< HEAD
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const StyledWelcomeText = styled(motion.div).attrs(({ className }) => ({
  className,
}))`
  h1 {
    font-size: 48px;
    font-weight: normal;
  }
  .app-name {
    color: ${({ theme }) => theme.mint};
    margin-bottom: 22px;
  }
  .app-purpose {
    margin-bottom: 82px;
  }
  @media (max-width: 961px) and (min-width: 577px) and (min-height: 599px) {
    .app-purpose {
      margin-bottom: 28px;
    }
  }
  @media (max-height: 600px) {
    .app-purpose {
      margin-bottom: 45px;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
    }
  }
  @media (max-width: 576px) {
    .app-purpose {
      margin-bottom: 48px;
      max-width: 260px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

const WelcomeText = ({ className, initial, final, variants }) => {
  return (
    <StyledWelcomeText
      className={className}
      initial={initial}
      animate={final}
      variants={variants}
    >
      <h1 className="welcome-text">Welcome to</h1>
      <h1 className="app-name">Budget Planner</h1>
      <span className="app-purpose span-text">
        Keep track of expenses & plan budgets ahead
      </span>
    </StyledWelcomeText>
  );
};

WelcomeText.propTypes = {
    className: PropTypes.string.isRequired,
    initial: PropTypes.string.isRequired,
    final: PropTypes.string.isRequired,
    variants: PropTypes.object
}

=======

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
    margin-top: 30px;
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

>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
export default WelcomeText;
