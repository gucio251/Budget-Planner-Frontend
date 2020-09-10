import React from "react";
import PropTypes from "prop-types";
import ValidationItem from "components/UI/ValidationItem";
import {
  StyledTickIcon,
  StyledErrorIcon,
  StyledUnderline,
  StyledValidations,
  StyledLabel,
  StyledInput,
  StyledTextInput
} from "./InputTextWithValidation.styled"



const TextInputWithValidation = ({name, value, label, handleChange, handleBlur ,type, touched, disabled, errorsStatuses, fieldCorrectness}) => {
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
        fieldCorrectness={fieldCorrectness}
      />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledTickIcon />
      <StyledErrorIcon />
      <StyledUnderline touched={touched} />
      <StyledValidations>
        {errorsStatuses.map(({ errorMsg, correctness }) => (
            <ValidationItem
              key={errorMsg}
              text={errorMsg}
              correctness={correctness}
            />
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
  fieldCorrectness: PropTypes.oneOf([
    PropTypes.bool, PropTypes.instanceOf(null)
  ]),
  disabled: PropTypes.bool,
  errorStatuses: PropTypes.shape({
    errorMsg: PropTypes.string.isRequired,
    correctness: PropTypes.bool.isRequired
  })
};

export default TextInputWithValidation;
