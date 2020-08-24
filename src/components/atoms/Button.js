import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';

const StyledButton = styled(motion.button).attrs(({ className }) => ({ className }))`
  width: 100%;
  height: 3.5em;
  border-radius: 0.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.darkMint};
  text-decoration: none;
  border: none;

  &:hover {
    transform: translateY(-5px);
    transition: 0.7 ease-in;
  }

  &:focus {
    border: none;
    outline-color: red;
  }

  .text {
    color: white;
    font-size: 16px;
  }
`;

const Button = ({title, onClick, className, type, variants}) => {
  return (
    <StyledButton type={type ? "submit" : ""} onClick={onClick} className={className} initial="initial" animate="final" variants={variants}>
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
  })
};

export default Button;
