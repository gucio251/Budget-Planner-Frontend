import React from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from 'react-redux';
import { mobileViewActions } from 'redux/actions/mobileViewActions';
import {
  StyledAppInfoSide,
  ContentWrapper,
  StyledLogo,
  MobileSectionWrapper,
} from './AppInfoSide.styled';
import WelcomeText from "components/WelcomeText/WelcomeText";
import RedirectComponent from "components/UI/RedirectComponent";
import Button from "components/UI/Button";

const AppInfoSide = ({linkData, buttonName}) => {
  const dispatch = useDispatch()
  const visibleOnMobile = useSelector(state => state.mobileView.onlyWorkingViewVisible);
  const { href, text, linkText } = linkData;

  return (
    <StyledAppInfoSide displayedOnMobile={!visibleOnMobile}>
      <ContentWrapper>
        <WelcomeText />
        <StyledLogo />
        <MobileSectionWrapper>
          <Button onClick={() => dispatch(mobileViewActions.setWorkingViewVisible())}>{buttonName}</Button>
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
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }).isRequired,
  buttonName: PropTypes.string.isRequired,
};

export default AppInfoSide;
