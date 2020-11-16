import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTextArea = styled.textarea`
  display: flex;
  align-items: flex-start;
  height: 80px;
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

  &::placeholder {
    transform: translateY(5px);
  }
`;

const TextArea = ({name, value, handleChange, placeholder, handleBlur}) => {
    return (
        <StyledTextArea placeholder={placeholder} name={name} value={value} onChange={handleChange} onBlur={handleBlur}/>
    );
};

TextArea.propTypes = {
    
};

export default TextArea;