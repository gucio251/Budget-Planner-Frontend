import React from "react";
import styled from "styled-components";
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
    variants: PropTypes.object.isRequired
}

export default WelcomeText;
