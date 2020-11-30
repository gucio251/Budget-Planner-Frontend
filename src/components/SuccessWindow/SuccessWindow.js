import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { navigate } from "@reach/router"
import {
  StyledSuccessWindow,
  StyledSuccessWindowWrapper,
  StyledTitle,
  StyledIcon
} from "./SuccessWindow.styled"
import Button from "components/UI/Button";


const SuccessWindow = ({ successMessage, href }) => {
  const wrapper = useRef();
  const [animationFinished, setAnimationFinished] = useState(false)

  const handleMovingToOtherPage = () => {
    navigate(href);
  }

  useLayoutEffect(() => {
    if(!animationFinished){
      const [elements] = wrapper.current.children;

      const bling = elements.getElementById("bling");
      const shape = elements.getElementById("Shape");
      const bling2 = elements.getElementById("bling-2");
      const shape2 = elements.getElementById("Shape-2");

      gsap.set([bling, bling2, shape, shape2], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.fromTo(shape, {drawSVG:0},{drawSVG:"100%",  autoAlpha: 1})
        .fromTo(bling, { drawSVG: 0 }, { drawSVG: "100%", autoAlpha: 1}, "+=0.3")
        .fromTo(bling2, { drawSVG: 0 }, { drawSVG: "100%", autoAlpha: 1}, "+=0.3")
        .fromTo(shape2, { drawSVG: 0 }, { drawSVG: "100%", autoAlpha: 1 })
      }

      setAnimationFinished(true);
  })


  return (
    <StyledSuccessWindow>
      <StyledSuccessWindowWrapper>
        <StyledTitle>{successMessage}</StyledTitle>
        <div ref={wrapper}>
          <StyledIcon />
        </div>
        <Button onClick={handleMovingToOtherPage}>Log in</Button>
      </StyledSuccessWindowWrapper>
    </StyledSuccessWindow>
  );
};

SuccessWindow.propTypes = {
  successMessage: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default SuccessWindow;
