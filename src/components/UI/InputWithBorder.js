import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputField = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGray};
  background-color: white;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.errorText};
  padding-left: 8px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.darkMint};
  }

`;

const InputWithBorder = ({name, value, handleChange, placeholder, handleBlur, type, step}) => {
  return (
    <InputField
        id={name}
        name={name}
        value={value ? value : ''}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
        step={step}
    />
    );
};

InputWithBorder.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  step: PropTypes.string,
};

export default InputWithBorder;