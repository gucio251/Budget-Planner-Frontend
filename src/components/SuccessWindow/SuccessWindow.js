import React from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router"
import {
  StyledSuccessWindow,
  StyledSuccessWindowWrapper,
  StyledTitle,
  ButtonWrapper,
  StyledIcon
} from "./SuccessWindow.styled"
import Button from "components/UI/Button";

const SuccessWindow = ({ successMessage, href }) => {
  const handleMovingToOtherPage = () => {
    navigate(href);
  }

  return (
    <StyledSuccessWindow>
      <StyledSuccessWindowWrapper>
        <StyledTitle>{successMessage}</StyledTitle>
        <StyledIcon />
        <ButtonWrapper>
          <Button onClick={handleMovingToOtherPage} color="#264AE7">
            Log in
          </Button>
        </ButtonWrapper>
      </StyledSuccessWindowWrapper>
    </StyledSuccessWindow>
  );
};

SuccessWindow.propTypes = {
  successMessage: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default SuccessWindow;
