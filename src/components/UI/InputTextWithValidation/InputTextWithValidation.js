import React from "react";
import PropTypes from "prop-types";
import {
  StyledTextInput,
  StyledTickIcon,
  StyledErrorIcon,
  StyledValidations,
  StyledLabel,
  StyledInput,
} from "./InputTextWithValidation.styled"



const TextInputWithValidation = ({name, value, label, handleChange, handleBlur ,type, touched, disabled, errors}) => {
  return (
    <StyledTextInput>
      <StyledInput
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        placeholder=" "
        autocomplete="off"
        disabled={disabled ? true : false}
        touched={touched}
        fieldCorrectness={touched && errors.length === 0 ? true : false}
      />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledTickIcon />
      <StyledErrorIcon />
      <StyledValidations>
        {errors.map((errorMsg) => (
            <li key={errorMsg}>{errorMsg}</li>
        ))}
      </StyledValidations>
    </StyledTextInput>
  );
};

TextInputWithValidation.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string)
};

export default TextInputWithValidation;
