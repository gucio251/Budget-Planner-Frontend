import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextAreaWithLimitation = styled.div`
  width: 100%;
  position: relative;
`

const WordsCounter = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0.8em;
  padding: 0 0.5em 0.5em 0;
  color: #7a7d8a;
`;

const StyledTextArea = styled.textarea`
  display: flex;
  align-items: flex-start;
  height: 80px;
  width: 100%;
  border: none;
  background-color: white;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  color: #262c42;
  padding: 0.5em 0 0 0.5em;

  &::placeholder {
    transform: translateY(5px);
  }
`;

const TextArea = ({name, value, handleChange, placeholder, handleBlur}) => {
    return (
      <TextAreaWithLimitation>
        <WordsCounter>
          {`${value.length}/100`}
        </WordsCounter>
        <StyledTextArea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={100}
        />
      </TextAreaWithLimitation>
    );
};

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

TextArea.defaultProps = {
  name: "",
  value: "",
  placeholder: "",
  handleChange: ()=> {},
  handleBlur: ()=>{}
}

export default TextArea;