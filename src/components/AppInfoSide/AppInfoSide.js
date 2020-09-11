import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import {
  StyledAppInfoSide,
  StyledPigLogo,
  StyledButtonWrapper,
  StyledSwitchMobile,
} from "./AppInfoSide.styled";
import WelcomeText from "components/WelcomeText/WelcomeText";
import RedirectComponent from "components/UI/RedirectComponent";
import Button from "components/UI/Button";

const coinSuccessVariants = {
  start: {
    y: "-100vh",
    x: 243.638,
  },
  final: {
    y: 155.6,
    x: 243.638,
    transition: { delay: 2, duration: 2, type: "tween" },
  },
};

const AppInfoSide = ({handleClickOnMobile, displayedOnMobile, linkData, buttonName, animated}) => {
  const { href, text, linkText } = linkData;

  const wrapper = useRef(null);
  const welcomeText = useRef();
  const mobileButton = useRef();
  const redirectComponent = useRef();
  const [animationFinished, setAnimationFinished] = useState(false)

  useLayoutEffect(() => {
    if (animated && !animationFinished) {
      const [elements] = wrapper.current.children;

      const floor = elements.getElementById("floor");
      const background = elements.getElementById("background");
      const body = elements.getElementById("body");
      const welcomeTextEl = welcomeText.current.children[0];
      const mobileButtonEl = mobileButton.current.children[0];
      const redirectComponentEl = redirectComponent.current.children[0];

      gsap.set([floor, background, body, welcomeTextEl, mobileButtonEl, redirectComponentEl], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.fromTo(background,{ scale: 0.1 },{ duration: 0.7, scale: 1, autoAlpha: 0.1 })
        .fromTo(floor, { y: "+=70" }, { duration: 0.7, y: 296, autoAlpha: 0.1 })
        .fromTo(body,{ y: "-800" }, { duration: 0.7, y: 0, autoAlpha: 1 }, "+=0.15")
        .fromTo(welcomeTextEl,{ x: "-800" },{ duration: 0.7, x: 0, autoAlpha: 1 },"+=0.15")
        .fromTo(mobileButtonEl,{ scale: 0 },{ duration: 0.7, scale: 1, autoAlpha: 1 },"+=0.15")
        .fromTo(redirectComponentEl,{ y: "400" },{ duration: 0.7, y: 0, autoAlpha: 1 },"+=0.15")
    }

    setAnimationFinished(true);
  });
  return (

    <StyledAppInfoSide displayedOnMobile={displayedOnMobile}>
      <div ref={welcomeText}>
        <WelcomeText />
      </div>
      <div ref={wrapper}>
        <StyledPigLogo />
      </div>
      <StyledButtonWrapper ref={mobileButton}>
        <Button title={buttonName} onClick={handleClickOnMobile} />
      </StyledButtonWrapper>
      <StyledSwitchMobile ref={redirectComponent}>
        <RedirectComponent
          spanText={text}
          linkText={linkText}
          href={href}
          linkColor="darkGray"
        />
      </StyledSwitchMobile>
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
