import styled, { keyframes } from "styled-components";
import {ReactComponent as TickIcon} from "assets/icons/tickLoginIcon.svg"
import {ReactComponent as ErrorIcon} from "assets/icons/errorLoginIcon.svg"

const draw = keyframes`
    to {
      stroke-dashoffset: 0;
    }
`;

export const StyledTickIcon = styled(TickIcon)`
  position: absolute;
  top: -8px;
  right: 4px;

  #circle {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 1.2s ease-in forwards;
  }

  #line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 2s ease-in forwards;
    animation-delay: 0.7s;
  }

  #line2 {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 2s ease-in forwards;
    animation-delay: 1s;
  }
`;

export const StyledErrorIcon = styled(ErrorIcon)`
  position: absolute;
  top: -8px;
  right: 4px;

  #circle {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 1.2s ease-in forwards;
  }

  #line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 2s ease-in forwards;
    animation-delay: 0.7s;
  }

  #line2 {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${draw} 2s ease-in forwards;
    animation-delay: 1s;
  }
`;

export const StyledUnderline = styled.span`
  display: block;
  position: relative;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.lightGray};
  transition: all 200ms ease-out;

  &::after {
    content: "";
    width: ${({ touched }) => (touched ? 100 : 0)}%;
    height: 100%;
    background: ${({ theme }) => theme.darkGray};
    display: inline-block;
    position: absolute;
    top: 0;
    transition: all 1s;
  }
`;

export const StyledValidations = styled.ul`
  overflow: hidden;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 6px;
  margin-bottom: 0;
  color: ${({ theme }) => theme.darkGray};
`;

export const StyledLabel = styled.label`
  position: absolute;
  top: 12px;
  display: block;
  font-size: 14px;
  transition: all 200ms ease-out;
  color: ${({ theme }) => theme.darkGray};
  z-index: -1;
`;

export const StyledInput = styled.input`
  display: block;
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: ${({ theme }) => theme.darkGray};
  background-color: transparent;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "context-menu")};
  }

  &:placeholder-shown + ${StyledLabel} {
    margin-top: 0%;
  }

  &:focus + ${StyledLabel}, &:not(:placeholder-shown) + ${StyledLabel} {
    color: ${({ theme }) => theme.darkGray};
    transform: translateY(-25px);
    font-size: 14px;
    font-weight: bold;
    transition: all 0.5s ease;
    will-change: transform;
  }

  &:focus ~ ${StyledTickIcon},
  &:focus ~ ${StyledErrorIcon}{
    display: none;
  }

  &:not(:focus) ~ ${StyledTickIcon} {
   display: ${({ touched, fieldCorrectness }) => touched && fieldCorrectness ? "block" : "none"};
  }

  &:not(:focus) ~ ${StyledErrorIcon} {
    display: ${({ touched, fieldCorrectness }) => touched && !fieldCorrectness ? "block" : "none"};
  }

  &:not(:focus) ~ ${StyledUnderline}:after {
    background-color: ${({ fieldCorrectness, theme }) => fieldCorrectness ? theme.darkMint : theme.errorRed};
  }

  &:focus ~ ${StyledUnderline} {
    background-color: ${({ theme }) => theme.darkGray};
  }

  &:focus ~ ${StyledValidations} {
    max-height: 350px;
    overflow: hidden;
    transition: all 1.5s ease;
    will-change: transform;
  }
`;

export const StyledTextInput = styled.div`
  flex: 1 1 100%;
  display: block;
  position: relative;
  margin-bottom: 40px;
`;