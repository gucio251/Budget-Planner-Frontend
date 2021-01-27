import React from "react";
import PropTypes from "prop-types";
import {
  StyledAppInfoSide,
  ContentWrapper,
  StyledLogo,
  MobileSectionWrapper,
} from './AppInfoSide.styled';
import WelcomeText from "components/WelcomeText/WelcomeText";
import RedirectComponent from "components/UI/RedirectComponent";
import Button from "components/UI/Button";


const AppInfoSide = ({handleClickOnMobile, displayedOnMobile, linkData, buttonName, animated}) => {
  const { href, text, linkText } = linkData;


  return (
    <StyledAppInfoSide displayedOnMobile={displayedOnMobile}>
      <ContentWrapper>
        <WelcomeText />
        <StyledLogo />
        <MobileSectionWrapper>
          <Button onClick={handleClickOnMobile}>{buttonName}</Button>
          <RedirectComponent
            spanText={text}
            linkText={linkText}
            href={href}
            linkColor="mainBlue"
          />
        </MobileSectionWrapper>
      </ContentWrapper>
    </StyledAppInfoSide>
  );
};

AppInfoSide.propTypes = {
  handleClickOnMobile: PropTypes.func,
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }).isRequired,
  animated: PropTypes.bool.isRequired,
  buttonName: PropTypes.string.isRequired,
};

export default AppInfoSide;
