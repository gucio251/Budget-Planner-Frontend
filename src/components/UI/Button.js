import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';

const StyledButton = styled(motion.button).attrs(({ className }) => ({
  className,
}))`
  width: 100%;
  height: 3.5em;
  border-radius: 0.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, disabled, color }) =>
    disabled ? theme.lightGrayDisabledButton : color};
  text-decoration: none;
  border: none;

  &:hover {
    transform: ${({ disabled }) =>
      disabled ? "translateY(0px)" : "translateY(-5px)"};
    transition: 0.7 ease-in;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "context-menu")};
  }

  &:focus {
    border: none;
    outline: none;
  }

  .text {
    color: ${({ theme, disabled }) => (disabled ? theme.darkGray : "white")};
    opacity: ${({ theme, disabled }) => (disabled ? 0.6 : 1)};
    font-size: 16px;
    display: flex;
    align-items: center;
  }
`;

const Button = ({onClick, type, disabled, children, color="#02AE9D"}) => {
  return (
    <StyledButton type={type ? "submit" : ""} onClick={onClick} disabled={disabled} color={color}>
      <div className="text">{children}</div>
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Button;
