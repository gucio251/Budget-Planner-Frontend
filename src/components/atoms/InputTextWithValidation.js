import React, { useState } from "react";
import ValidationItem from "./ValidationItem";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTextInput = styled.div.attrs(({ className }) => ({ className }))`
  position: relative;
  label {
    position: absolute;
    top: 12px;
    display: block;
    font-size: 14px;
    transition: all 200ms ease-out;
    color: ${({ theme }) => theme.darkGray};
    z-index: -1;
  }

  input {
    display: block;
    border: none;
    outline: none;
    width: 100%;
    height: 30px;
    font-size: 12px;
    color: ${({ theme }) => theme.darkGray};
    background-color: transparent;
  }

  input:focus ~ .underline {
    background-color: ${({ theme }) => theme.darkGray};
  }

  input:placeholder-shown + .placeholder-control {
    margin-top: 0%;
  }

  input:focus + .placeholder-control,
  input:not(:placeholder-shown) + .placeholder-control {
    color: ${({ theme }) => theme.darkGray};
    transform: translateY(-25px);
    font-size: 14px;
    font-weight: bold;
    transition: all 0.5s ease;
    will-change: transform;
  }

  input:focus ~ .all-validations {
    max-height: 350px;
    overflow: hidden;
    transition: all 1.5s ease;
    will-change: transform;
  }

  .all-validations {
    overflow: hidden;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .underline {
    display: block;
    position: relative;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.lightGray};
    transition: all 200ms ease-out;
  }

  .underline::after {
    content: "";
    width: ${({ visibility }) => (visibility ? 100 : 0)}%;
    height: 100%;
    background: ${({ theme }) => theme.darkGray};
    display: inline-block;
    position: absolute;
    top: 0;
    transition: all 1s;
  }

  .validation-container {
    display: block;
    position: relative;
    font-size: 15px;
    margin-top: 10px;
  }

  #circle {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 1.2s ease-in forwards;
  }

  #line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 2s ease-in forwards;
    animation-delay: 0.7s;
  }

  #line2 {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 2s ease-in forwards;
    animation-delay: 1s;
  }

  input:not(:focus) ~ .underline:after {
    background-color: ${({ fieldCorrectness, theme }) =>
      fieldCorrectness ? theme.darkMint : theme.errorRed};
  }

  input:not(:focus) ~ #tick {
   display: ${({ visibility, fieldCorrectness }) =>
     visibility === true
       ? fieldCorrectness === true
         ? "block"
         : "none"
       : "none"};
  }
  }

  input:not(:focus) ~ #error {
    display: ${({ visibility, fieldCorrectness }) =>
      visibility === true
        ? fieldCorrectness === false
          ? "block"
          : "none"
        : "none"}
  }

  input:focus ~ #tick,
  input:focus ~ #error {
    display: none;
  }

  .correctness-icon {
    position: absolute;
    top: -8px;
    right: 4px;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const TextInputWithValidation = ({
  className,
  name,
  value,
  label,
  onChange,
  validation,
  type,
  visibility,
  fieldCorrectness,
}) => {
  return (
    <StyledTextInput
      className={className}
      visibility={visibility}
      fieldCorrectness={fieldCorrectness}
    >
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder=" "
        autocomplete="off"
      />
      <label className="placeholder-control" htmlFor={name}>
        {label}
      </label>
      <svg
        id="tick"
        className="correctness-icon"
        data-name="check active"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g id="circle" data-name="Group 3">
          <g
            id="Oval_Copy_23"
            data-name="Oval Copy 23"
            fill="none"
            stroke="#02ae9d"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="12" stroke="none" />
            <circle cx="12" cy="12" r="11" fill="none" />
          </g>
          <path
            id="line"
            d="M0,5.948,3.79,6V0"
            transform="translate(13.002 7.259) rotate(45)"
            fill="none"
            stroke="#02ae9d"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
      <svg
        id="error"
        className="correctness-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g id="Group_6" data-name="Group 6">
          <g
            id="circle"
            data-name="Oval Copy 25"
            fill="none"
            stroke="#db0b0b"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="12" stroke="none" />
            <circle cx="12" cy="12" r="11" fill="none" />
          </g>
          <path
            id="line"
            data-name="Line 2"
            d="M0,.5H8"
            transform="translate(9.525 8.818) rotate(45)"
            fill="none"
            stroke="#db0b0b"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            id="line2"
            data-name="Line 2"
            d="M.5,0V8"
            transform="translate(14.475 8.818) rotate(45)"
            fill="none"
            stroke="#db0b0b"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
      <span className="underline"></span>
      <div className="all-validations">
        {Object.keys(validation).map((property) => (
          <ValidationItem
            key={property}
            className="validation-container"
            text={validation[property].displayValue}
            correctness={validation[property].correctness}
          />
        ))}
      </div>
    </StyledTextInput>
  );
};

TextInputWithValidation.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
};

export default TextInputWithValidation;
