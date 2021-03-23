import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Input = styled.input`
    background-color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    padding-left: 10px;
    height: 40px;
    width: 100%;
`

const InputField = ({placeholder, type, step, name, value, handleChange, handleKeyDown}) => {
    return (
      <Input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        type={type}
        step={step}
      />
    );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  step: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

export default InputField;