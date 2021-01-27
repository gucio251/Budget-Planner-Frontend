import styled, { keyframes } from "styled-components";
import {ReactComponent as TickIcon} from "assets/icons/tickLoginIcon.svg"
import {ReactComponent as ErrorIcon} from "assets/icons/errorLoginIcon.svg"

export const StyledTextInput = styled.div`
  position: relative;
  padding-bottom: 1em;
`;
const draw = keyframes`
    to {
      stroke-dashoffset: 0;
    }
`;

export const StyledTickIcon = styled(TickIcon)`
  position: absolute;
  top: 2px;
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
  top: 2px;
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

export const StyledValidations = styled.ul`
  overflow: hidden;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
  color: #B5B6BD;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 14px;
  transform: translateY(-1.4em);
  transform-origin: 0 0;
  transition: all .3s;
  color: ${({ theme }) => theme.darkGray};
`;

export const StyledInput = styled.input`
  border-color: ${({ theme, touched, fieldCorrectness }) =>  !touched ? theme.lightGray : fieldCorrectness ? '#00C48C' : '#DB0B0B'};
  border-style: none none solid none;
  height: 30px;
  outline: none;
  width: 100%;
  box-shadow: none;
  font-size: 12px;
  color: ${({ touched, theme }) =>
    touched ? theme.dashboardBlack : theme.darkGray};
  background-color: transparent;
  transition: all 0.5s;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'context-menu')};
  }

  &:focus {
    border-color: ${({ theme }) => theme.darkGray};
  }

  &:focus + ${StyledLabel}, &:not(:placeholder-shown) + ${StyledLabel} {
    transform: translateY(-3.5em) scale(0.8);
  }

  &:focus ~ ${StyledTickIcon} {
    display: ${({ fieldCorrectness }) => (fieldCorrectness ? 'block' : 'none')};
  }

  &:focus ~ ${StyledErrorIcon} {
    display: none;
  }

  &:not(:focus) ~ ${StyledTickIcon} {
    display: ${({ fieldCorrectness }) => (fieldCorrectness ? 'block' : 'none')};
  }

  &:not(:focus) ~ ${StyledErrorIcon} {
    display: ${({ fieldCorrectness, touched }) =>
      !touched ? 'none' : !fieldCorrectness ? 'block' : 'none'};
  }

  &:focus ~ ${StyledValidations} {
    max-height: 350px;
    overflow: hidden;
    transition: all 1.5s ease;
    will-change: transform;
  }
`;
