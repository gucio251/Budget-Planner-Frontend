import React from "react";
import styled from "styled-components";
import Proptypes from 'prop-types'

const StyledButton = styled.button.attrs(({ className }) => ({ className }))`
  width: 88%;
  height: 48px;
  border-radius: 4px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.darkMint};
  text-decoration: none;
  border: none;

  &:hover {
    transform: translateY(-5px);
    transition: 0.7 ease-in;
  }
  .text {
    color: white;
    font-size: 16px;
  }
`;

const Button = ({title, onClick, className, type}) => {
  return (
    <StyledButton type={type ? "submit" : ""} onClick={onClick} className={className}>
      <div className="text">{title}</div>
    </StyledButton>
  );
};

Button.propTypes = {
  title: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired,
  className: Proptypes.string,
  type: Proptypes.string
};

export default Button;
