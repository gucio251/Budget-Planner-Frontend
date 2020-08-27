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
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.lightGrayDisabledButton : theme.darkMint};
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
  }
`;

const Button = ({title, onClick, className, type, variants, disabled}) => {
  return (
    <StyledButton type={type ? "submit" : ""} onClick={onClick} className={className} initial="initial" animate="final" variants={variants} disabled={disabled}>
      <div className="text">{title}</div>
    </StyledButton>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  variants: PropTypes.shape({
    initial: PropTypes.object.isRequired,
    final: PropTypes.object.isRequired
  }),
  disabled: PropTypes.bool
};

export default Button;
