import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Input = styled.input`
    background-color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    padding-left: 10px;
    height: 40px;
    min-width: 100%;
`

const InputField = ({placeholder, type, step, name, value, handleChange}) => {
    return (
      <Input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        step={step}
      />
    );
};

InputField.propTypes = {
    
};

export default InputField;