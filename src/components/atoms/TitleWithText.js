import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTextArea = styled.div.attrs(({className}) => ({
  className
}))`
  .info-title {
    color: ${({ theme }) => theme.yellow};
    margin-bottom: 10px;
  }

  .info-text {
    display: flex;
    color: white;
    opacity: 0.8;
    margin-right: 20px;
  }
`;

const TitleWithText = ({ className, title, text }) => {
  return (
    <StyledTextArea className={className}>
      <h2 className="info-title">{title}</h2>
      <span className="info-text">{text}</span>
    </StyledTextArea>
  );
};

TitleWithText.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TitleWithText;
