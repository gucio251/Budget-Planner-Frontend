<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import Button from "./../atoms/Button";

const StyledSuccessWindow = styled.div.attrs(({ className }) => ({
  className,
}))`
  .message {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20%;
    color: ${({ theme }) => theme.mainBlue};
    width: 400px;
  }

  .btn-success {
    width: 300px;
    margin-top: 18%;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 30px 0;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  #tick {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 2s ease-in forwards;
    animation-delay: 1s;
  }

  @media (max-width: 961px) and (min-width: 577px) and (min-height: 599px) {
    .wrapper {
      align-items: center;
    }

    .message {
      font-size: 16px;
      width: 250px;
    }

    .btn-success {
      width: 250px;
    }
  }

  @media (max-width: 576px) {
    .wrapper {
      justify-content: center;
      align-items: center;
    }
    .message {
      width: 300px;
    }
  }
`;

const circleVariants = {
    hidden: {
        pathLength:0,
        strokeWidth: 3.35
    },
    visible: {
        pathLength: 1,
        strokeWidth: 3.35,
        transition: {
            delay: 0.5,
            duration: .3,
            ease: "easeInOut"
        }
    }
}

const lineVariants = {
  hidden: {
    opacity: 1,
    pathLength: 0,
    strokeWidth: 3.35,
  },
  visible: {
    pathLength: 1,
    strokeWidth: 3.35,
    transition: {
      duration: 0.3,
      delay: 2,
      ease: "easeInOut",
    },
  },
};


const blingVariants = {
  hidden: {
    scale: 0.1,
    x: 150,
  },
  visible: {
    scale: 1,
    x: 150,
    transition: {
        duration: .3,
        delay: 2.5,
        ease: "easeInOut"
    }
    }
}

const bling2Variants = {
  hidden: {
    scale: 0.1,
    y: 133
  },
  visible: {
    scale: 1,
    y: 133,
    transition: {
      duration: .3,
      delay: 2,
      ease: "easeInOut",
    },
  },
};

const buttonVariants = {
  initial: {
    scale: 0,
  },
  final: {
    scale: 1,
    transition: {delay: 3, duration: 0.3, type:"tween"}
  }
}

const SuccessWindow = ({ className, successMessage, href }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(href);
  }
  return (
    <StyledSuccessWindow className={className}>
      <div className="wrapper">
        <motion.span
          className="message"
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "tween" }}
        >
          {successMessage}
        </motion.span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="188.465"
          height="188.481"
          viewBox="0 0 188.465 188.481"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <g
            id="Group_3"
            data-name="Group 3"
            transform="translate(1.635 1.879)"
          >
            <g id="Done" transform="translate(0.45 0.45)">
              <motion.path
                id="Shape"
                d="M63.446,130.232h0a52.462,52.462,0,0,1-10.021-.964l13.247.85C65.652,130.194,64.567,130.232,63.446,130.232ZM72.5,129.6,48,127.847A64.509,64.509,0,0,1,24.432,115.9,65.292,65.292,0,0,1,2.217,48.1a64.793,64.793,0,0,1,125.509,1.332,65.863,65.863,0,0,1,.994,26.339A64.722,64.722,0,0,1,72.5,129.6Z"
                transform="matrix(0.719, -0.695, 0.695, 0.719, 0.301, 90.085)"
                fill="#fff"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
                initial="hidden"
                animate="visible"
                variants={circleVariants}
              />
              <motion.g
                id="bling"
                transform="translate(155.7 25.65)"
                initial="hidden"
                animate="visible"
                variants={blingVariants}
              >
                <path
                  id="Line"
                  d="M.675,0V8.1"
                  transform="translate(13.5)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
                <path
                  id="Line-2"
                  data-name="Line"
                  d="M.675,0V8.1"
                  transform="translate(13.5 18.9)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
                <path
                  id="Line-3"
                  data-name="Line"
                  d="M.675,0V8.1"
                  transform="translate(0.675 14.175) rotate(-90)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
                <path
                  id="Line-4"
                  data-name="Line"
                  d="M.675,0V8.1"
                  transform="translate(19.575 14.175) rotate(-90)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
              </motion.g>
              <motion.g
                id="bling-2"
                data-name="bling"
                transform="translate(0.45 133.65)"
                initial="hidden"
                animate="visible"
                variants={bling2Variants}
              >
                <path
                  id="Line-5"
                  data-name="Line"
                  d="M.675,0V5.4"
                  transform="translate(10.8)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
                <path
                  id="Line-6"
                  data-name="Line"
                  d="M.675,0V5.4"
                  transform="translate(10.8 16.2)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
                <path
                  id="Line-7"
                  data-name="Line"
                  d="M.675,0V5.4"
                  transform="translate(0.675 11.475) rotate(-90)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
                <path
                  id="Line-8"
                  data-name="Line"
                  d="M.675,0V5.4"
                  transform="translate(16.875 11.475) rotate(-90)"
                  fill="none"
                  stroke="#02ae9d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3.375"
                />
              </motion.g>
              <motion.path
                id="Shape-2"
                data-name="Shape"
                d="M43.649,4.639,15.3.3A57.038,57.038,0,0,1,35.258,1.765a56.354,56.354,0,0,1,8.391,2.872ZM.023,4.1v0c1.2-.485,2.439-.936,3.681-1.34C5.41,2.2,7.158,1.727,8.9,1.34Z"
                transform="matrix(0.719, -0.695, 0.695, 0.719, 37.619, 65.734)"
                fill="#fff"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
              />
              <path
                id="tick"
                data-name="Path 7"
                d="M7.329,18.7c-1.966-1.771-2.941-.411-4.737,1.528S-1.141,23.951.825,25.722l22.691,20.44a6.817,6.817,0,0,0,9.536-.425c.105-.115.105-.115.207-.234L47.42,28.708,65.641,7.1c1.7-2.019-.46-3.411-2.508-5.089s-3.2-3.009-4.907-.99L27.782,37.125Z"
                transform="translate(59.245 72.246)"
                stroke="#02ae9d"
                fill="transparent"
                stroke-miterlimit="10"
                stroke-width="5"
              />
            </g>
          </g>
        </motion.svg>
        <Button
          className="btn-success"
          title="Sign in"
          onClick={onClick}
          variants={buttonVariants}
        />
      </div>
=======
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
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
    </StyledSuccessWindow>
  );
};

SuccessWindow.propTypes = {
<<<<<<< HEAD
  className: PropTypes.string.isRequired,
=======
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
  successMessage: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default SuccessWindow;
