import React from 'react';
import {motion} from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";
import WelcomeText from "./../WelcomeText/WelcomeText";
import RedirectComponent from "../atoms/RedirectComponent";
import Button from "../atoms/Button";

const StyledAppInfoSide = styled.div.attrs(({ className }) => ({
  className,
}))`
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .wrapper-info-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }

  svg {
    overflow: visible;
  }

  .span-text {
    font-size: 16px;
    position: relative;
    display: inline-block;
  }

  .login-switch-mobile {
    display: none;
    margin-top: 17px !important;
    color: ${({ theme }) => theme.lightGray};
  }

  #pig {
    /* animation: shake 3s 5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px; */
  }

  #pig-body {
    z-index: 10;
  }

  #success-coin {
    z-index: 5;
  }

  .mobile-button {
    display: none;
  }

  #pig-with-background {
    width: 493px;
    height: 355px;
  }

  @keyframes shake {
    5%,
    45% {
      transform: translate3d(-1px, 0, 0);
    }

    10%,
    40% {
      transform: translate3d(4px, 0, 0);
    }

    15%,
    25%,
    35% {
      transform: translate3d(-8px, 0, 0);
    }

    20%,
    30% {
      transform: translate3d(8px, 0, 0);
    }
  }

  @media (max-width: 961px) and (min-width: 577px) and (min-height: 599px) {
    #pig-with-background {
      width: 250px;
      height: 150px;
    }

    .wrapper-info-side {
      overflow: hidden;
    }

    h1 {
      font-size: 32px;
    }

    .app-purpose {
      font-size: 12px;
    }
  }

  @media (max-height: 600px) {
    .wrapper-info-side {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 45px;
    }

    .text-container {
      display: flex;
      justify-content: center;
      padding: 0 20%;
    }

    #pig-with-background {
      width: 245px;
      height: 177px;
      margin-bottom: 40px;
    }
  }

  @media (max-width: 576px) {
    .wrapper-info-side {
      width: 100%;
      height: 85%;
      margin-top: 20px;
      display: flex;
      flex: 0 0 100%;
      align-items: center;
    }

    .mobile-button {
      display: block;
      width: 272px;
      margin-top: 80px;
    }

    #pig-with-background {
      width: 300px;
      height: 212px;
    }

    .margin-button {
      margin-top: 60%;
    }

    .login-switch-mobile {
      display: block;
      width: 272px;
    }
  }
`;

const WelcomeTextVariants = {
    start: {
        x: "-100vw",
    },
    final: {
        x: 0,
        transition: {delay: 1.4, type: "tween" },
    },
};

const coinSuccessVariants = {
  start: {
    y: '-100vh',
    x: 243.638,
  },
  final: {
    y: 155.6,
    x: 243.638,
    transition: { delay: 2, duration: 2, type: "tween" },
  },
};

const mobilebuttonVariants = {
    initial: {
      scale: 0,
    },
    final: {
      scale: 1,
      transition: {delay: 1.7, type: "tween"}
    }
}

const redirectComponentVariants = {
  initial: {
    y: 300
  },
  final: {
    y: 0,
    transition: {delay: 2, type: "tween"}
  }
}

const ovalComponentVariant = {
  initial: {
    x: "-100vh",
    y: 296
  },
  final: {
    x: 0,
    y: 296,
    transition:{ duration: 0.7 }
  },
};

const pathComponentVariant = {
  initial: {
    scale: 0.1,
    x: 78,
  },
  final: {
    scale: 1,
    x: 78,
    transition:{ duration: 0.7 }
  },
};

const pigComponentVariant = {
  initial: {
    y: -1000,
    z: 100,
  },
  final: {
    y: 0,
    z: 100,
    transition:{
      duration: 0.7,
      delay: 0.7,
      type: "tween",
    }
  },
};
const AppInfoSide = ({handleClickOnMobile, className, firstRender, animation, linkData, buttonName, href}) => {
    return (
      <StyledAppInfoSide className={className}>
        <div className="wrapper-info-side">
          <WelcomeText
            className="text-container"
            initial="start"
            final="final"
            variants={firstRender ? WelcomeTextVariants : null}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="pig-with-background"
            viewBox="0 0 493.038 355.839"
          >
            <g id="undraw_Savings_dwkw" transform="translate(0)">
              <motion.ellipse
                id="Oval"
                cx="246.519"
                cy="29.964"
                rx="246.519"
                ry="29.964"
                transform="translate(0 296)"
                fill="#03dac5"
                opacity="0.1"
                initial="initial"
                animate="final"
                variants={firstRender ? ovalComponentVariant : null}
              />
              <motion.path
                id="Path"
                d="M220.769,41.929c-24.359-.846-47.56-8.71-69.715-17.314S106.956,6.48,83.18,1.921C67.887-1.012,50.4-1.426,38.077,6.773,26.22,14.663,22.389,28.282,20.329,40.92c-1.55,9.508-2.461,19.515,1.785,28.416,2.948,6.18,8.183,11.374,11.8,17.293,12.6,20.6,3.693,45.994-9.957,66.105-6.4,9.434-13.83,18.433-18.771,28.475S-2.038,202.759,2.285,213c4.285,10.154,14.5,17.78,25.557,23.144,22.466,10.895,48.939,14.013,74.754,15.779,57.144,3.909,114.594,2.217,171.89.522,21.2-.627,42.5-1.263,63.361-4.542,11.584-1.821,23.543-4.711,31.952-11.687,10.676-8.857,13.322-23.853,6.168-34.958-12-18.627-45.176-23.254-53.563-43.245-4.617-11,.124-23.26,6.833-33.466,14.392-21.892,38.515-41.1,39.786-66.121.873-17.186-10.724-34.4-28.655-42.529-18.8-8.523-44.857-7.451-58.723,6.658C267.368,37.086,242.277,42.676,220.769,41.929Z"
                transform="translate(78.057)"
                fill="#03dac5"
                opacity="0.1"
                initial="initial"
                animate="final"
                variants={firstRender ? pathComponentVariant : null}
              />
              <motion.g
                initial="initial"
                animate="final"
                variants={firstRender ? pigComponentVariant : null}
              >
                <ellipse
                  id="Oval-2"
                  data-name="Oval"
                  cx="16.563"
                  cy="17.581"
                  rx="16.563"
                  ry="17.581"
                  transform="translate(283.566 277.684)"
                  fill="#fbd56f"
                />
                <ellipse
                  id="Oval-3"
                  data-name="Oval"
                  cx="16.563"
                  cy="17.581"
                  rx="16.563"
                  ry="17.581"
                  transform="translate(283.566 277.684)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-4"
                  data-name="Oval"
                  cx="16.563"
                  cy="17.189"
                  rx="16.563"
                  ry="17.189"
                  transform="translate(286.424 278.467)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-2"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(307.377 309.881)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-3"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(307.377 309.881)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-5"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(307.972 306.187)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-4"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(314.303 303.852)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-5"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(314.303 303.852)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-6"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(314.899 300.158)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-6"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(320.426 295.927)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-7"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(320.426 295.927)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-7"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(321.022 292.234)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-8"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(313.645 287.678)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-9"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(313.645 287.678)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-8"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(314.241 283.985)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-10"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(328.9 281.058)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-11"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(328.9 281.058)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-9"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(329.495 277.365)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-12"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(318.593 276.609)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-13"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(318.593 276.609)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-10"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(319.189 272.915)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-14"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(325.475 268.019)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-15"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(325.475 268.019)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-11"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(326.07 264.325)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-16"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(328.869 257.823)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-17"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(328.869 257.823)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-12"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(329.464 254.13)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-18"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(359.472 312.246)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-19"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(359.472 312.246)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-13"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(360.067 308.552)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-20"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(365.595 304.321)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-21"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(365.595 304.321)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-14"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(366.19 300.628)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-22"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(358.814 296.072)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-23"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(358.814 296.072)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-15"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(359.409 292.379)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-24"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(374.069 289.452)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-25"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(374.069 289.452)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-16"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(374.664 285.759)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-26"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(363.762 285.003)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-27"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.87,20.87,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(363.762 285.003)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-17"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(364.357 281.309)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-28"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(370.643 276.413)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-29"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(370.643 276.413)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-18"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(371.239 272.719)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-30"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(374.038 266.217)"
                  fill="#fbd56f"
                />
                <path
                  id="Path-31"
                  data-name="Path"
                  d="M2.318,1.352.6.393A20.869,20.869,0,0,0,.053,6.152a1.194,1.194,0,0,0,.9,1.031c3.963.984,22.853,5.178,35.842-.729a1.192,1.192,0,0,0,.69-.958,17.844,17.844,0,0,0-.63-5.1C36.368-.881,2.318,1.352,2.318,1.352Z"
                  transform="translate(374.038 266.217)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-19"
                  data-name="Oval"
                  cx="18.129"
                  cy="4.086"
                  rx="18.129"
                  ry="4.086"
                  transform="translate(374.633 262.523)"
                  fill="#fbd56f"
                />
                <ellipse
                  id="Oval-20"
                  data-name="Oval"
                  cx="16.563"
                  cy="17.581"
                  rx="16.563"
                  ry="17.581"
                  transform="translate(321.19 302.766)"
                  fill="#fbd56f"
                />
                <ellipse
                  id="Oval-21"
                  data-name="Oval"
                  cx="16.563"
                  cy="17.581"
                  rx="16.563"
                  ry="17.581"
                  transform="translate(321.19 302.766)"
                  opacity="0.1"
                />
                <ellipse
                  id="Oval-22"
                  data-name="Oval"
                  cx="16.563"
                  cy="17.189"
                  rx="16.563"
                  ry="17.189"
                  transform="translate(324.048 303.55)"
                  fill="#fbd56f"
                />
                <g id="pig">
                  <path
                    id="Path-32"
                    data-name="Path"
                    d="M20.226,3.09a17.832,17.832,0,0,1,2.217,4.049c.148.372.293.763.43,1.174,2.2,6.586-1.288,14.485-2.287,13.633s-4.109-2.433-4.711-.211a12.747,12.747,0,0,1-2.824,4.492C9,30.3,5.339,25.9,2.934,21.352A44.032,44.032,0,0,1,.841,16.728C.307,15.332,0,14.367,0,14.367L16.862,0A9.982,9.982,0,0,1,20.226,3.09Z"
                    transform="translate(265.375 300.911)"
                    fill="#03dac5"
                  />
                  <path
                    id="Path-33"
                    data-name="Path"
                    d="M20.226,3.09a17.833,17.833,0,0,1,2.217,4.049c.148.372.293.763.43,1.174,2.2,6.586-1.288,14.485-2.287,13.633s-4.109-2.433-4.711-.211a12.747,12.747,0,0,1-2.824,4.492C9,30.3,5.339,25.9,2.934,21.352A44.033,44.033,0,0,1,.841,16.728C.307,15.332,0,14.367,0,14.367L16.862,0A9.981,9.981,0,0,1,20.226,3.09Z"
                    transform="translate(238.799 310.098)"
                    fill="#03dac5"
                  />

                  <path
                    id="Path-34"
                    data-name="Path"
                    d="M25.5,4.525a17.832,17.832,0,0,1-.877,4.532c-.124.381-.262.775-.418,1.178C21.7,16.713,13.969,20.565,13.744,19.272s-1.611-4.5-3.492-3.169a12.747,12.747,0,0,1-5.04,1.656C-.5,18.31-.517,12.584.532,7.549a44.032,44.032,0,0,1,1.34-4.9C2.352,1.238,2.731.3,2.731.3L24.882,0A9.982,9.982,0,0,1,25.5,4.525Z"
                    transform="translate(180.163 321.354)"
                    fill="#03dac5"
                  />
                  <path
                    id="Path-35"
                    data-name="Path"
                    d="M25.5,4.525a17.832,17.832,0,0,1-.877,4.532c-.124.381-.262.775-.418,1.178C21.7,16.713,13.969,20.565,13.744,19.272s-1.611-4.5-3.492-3.169a12.747,12.747,0,0,1-5.04,1.656C-.5,18.31-.517,12.584.532,7.549a44.033,44.033,0,0,1,1.34-4.9C2.352,1.238,2.731.3,2.731.3L24.882,0A9.981,9.981,0,0,1,25.5,4.525Z"
                    transform="translate(151.542 314.136)"
                    fill="#03dac5"
                  />
                  <path
                    id="Path-36"
                    data-name="Path"
                    d="M20.226,3.09a17.832,17.832,0,0,1,2.217,4.049c.148.372.293.763.43,1.174,2.2,6.586-1.288,14.485-2.287,13.633s-4.109-2.433-4.711-.211a12.747,12.747,0,0,1-2.824,4.492C9,30.3,5.339,25.9,2.934,21.352A44.032,44.032,0,0,1,.841,16.728C.307,15.332,0,14.367,0,14.367L16.862,0A9.982,9.982,0,0,1,20.226,3.09Z"
                    transform="translate(265.375 300.911)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-37"
                    data-name="Path"
                    d="M20.226,3.09a17.833,17.833,0,0,1,2.217,4.049c.148.372.293.763.43,1.174,2.2,6.586-1.288,14.485-2.287,13.633s-4.109-2.433-4.711-.211a12.747,12.747,0,0,1-2.824,4.492C9,30.3,5.339,25.9,2.934,21.352A44.033,44.033,0,0,1,.841,16.728C.307,15.332,0,14.367,0,14.367L16.862,0A9.981,9.981,0,0,1,20.226,3.09Z"
                    transform="translate(238.799 310.098)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-38"
                    data-name="Path"
                    d="M25.5,4.525a17.832,17.832,0,0,1-.877,4.532c-.124.381-.262.775-.418,1.178C21.7,16.713,13.969,20.565,13.744,19.272s-1.611-4.5-3.492-3.169a12.747,12.747,0,0,1-5.04,1.656C-.5,18.31-.517,12.584.532,7.549a44.032,44.032,0,0,1,1.34-4.9C2.352,1.238,2.731.3,2.731.3L24.882,0A9.982,9.982,0,0,1,25.5,4.525Z"
                    transform="translate(180.163 321.354)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-39"
                    data-name="Path"
                    d="M25.5,4.525a17.832,17.832,0,0,1-.877,4.532c-.124.381-.262.775-.418,1.178C21.7,16.713,13.969,20.565,13.744,19.272s-1.611-4.5-3.492-3.169a12.747,12.747,0,0,1-5.04,1.656C-.5,18.31-.517,12.584.532,7.549a44.033,44.033,0,0,1,1.34-4.9C2.352,1.238,2.731.3,2.731.3L24.882,0A9.981,9.981,0,0,1,25.5,4.525Z"
                    transform="translate(151.542 314.136)"
                    opacity="0.2"
                  />
                  <path
                    id="pig-body"
                    data-name="Path"
                    d="M224.782,107.126c0,59.164-20.014,107.126-112.376,107.126C50.343,214.252,2.328,198.831.031,107.126-1.45,47.98,50.343,0,112.407,0S224.782,47.962,224.782,107.126Z"
                    transform="translate(105.798 114.456)"
                    fill="#03dac5"
                  />
                  <path
                    id="Path-41"
                    data-name="Path"
                    d="M.214.219H.227l-.01,0Z"
                    transform="translate(196.91 116.107)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-42"
                    data-name="Path"
                    d="M.158.3c.285-.046.85-.125,1.67-.187L0,.329Q.039.319.1.309Z"
                    transform="translate(197.187 115.991)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-43"
                    data-name="Path"
                    d="M81.353,45.41l-8.2,2.953A183.222,183.222,0,0,0,59.676,32.3,131.637,131.637,0,0,0,42.611,17.012C21.609,1.447,5.365,1.05,0,1.45L12.33,0a100.248,100.248,0,0,1,33.1,11.966,109.358,109.358,0,0,1,19.893,14.7A97.269,97.269,0,0,1,81.353,45.41Z"
                    transform="translate(199.027 114.653)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-44"
                    data-name="Path"
                    d="M5.338,46.269S-5.49,10.178,3.7.335c0,0,14.437-4.922,25.264,22.967Z"
                    transform="translate(200.891 119.371)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-45"
                    data-name="Path"
                    d="M0,20.481S28.713-3.919,41.416.546c0,0,10.3,11.248-10.9,32.357Z"
                    transform="translate(261.055 111.45)"
                    fill="#03dac5"
                  />
                  <path
                    id="Path-46"
                    data-name="Path"
                    d="M0,20.481S28.713-3.919,41.416.546c0,0,10.3,11.248-10.9,32.357Z"
                    transform="translate(261.055 111.45)"
                    opacity="0.2"
                  />
                  <path
                    id="Path-47"
                    data-name="Path"
                    d="M77.761,57.681c0,31.8-22.821,56.926-44.294,56.926S0,89.483,0,57.681,17.443,1.341,38.88.1C72.839-1.87,77.761,25.879,77.761,57.681Z"
                    transform="translate(272.834 191.134)"
                    fill="#03dac5"
                  />
                  <path
                    id="Path-48"
                    data-name="Path"
                    d="M77.761,57.681c0,31.8-22.821,56.926-44.294,56.926S0,89.483,0,57.681,17.443,1.341,38.88.1C72.839-1.87,77.761,25.879,77.761,57.681Z"
                    transform="translate(272.834 191.134)"
                    opacity="0.2"
                  />
                  <ellipse
                    id="Oval-23"
                    data-name="Oval"
                    cx="7.218"
                    cy="9.187"
                    rx="7.218"
                    ry="9.187"
                    transform="translate(297.77 244.385)"
                    fill="#03dac5"
                  />
                  <ellipse
                    id="Oval-24"
                    data-name="Oval"
                    cx="7.218"
                    cy="9.187"
                    rx="7.218"
                    ry="9.187"
                    transform="translate(323.362 236.511)"
                    fill="#03dac5"
                  />
                  {animation === true && (
                    <motion.circle
                      id="success-coin"
                      data-name="Oval"
                      cx="8.5"
                      cy="8.5"
                      r="14"
                      fill="#fad46f"
                      initial="start"
                      animate="final"
                      variants={coinSuccessVariants}
                    />
                  )}
                  <path
                    id="Rectangle"
                    d="M8.777,0a45.825,45.825,0,0,1,4.516,2.561C15.329,3.97,23.973,11.9,25.275,13a68.07,68.07,0,0,1,8.265,9.311C38.709,29.1,44.526,37.9,44.526,37.9l-15.8,21.657L-.462,50.244S-15.908,39.3-16.05,33.818c0-.093,12.79-10.675,12.764-10.881-.275-2.149,2.523-4.149,4.538-5.666.812-.611,2.376-2.577,3.614-3.153,1.469-.683,2.561.034,2.537-.576A64.493,64.493,0,0,1,8.777,0Z"
                    transform="translate(227 128)"
                    fill="#03dac5"
                  />
                </g>
              </motion.g>
            </g>
          </svg>
          <Button
            className="mobile-button"
            title={buttonName}
            onClick={handleClickOnMobile}
            variants={firstRender ? mobilebuttonVariants : null}
          />
          <RedirectComponent
            className="login-switch-mobile span-text"
            spanText={linkData.text}
            linkText={linkData.linkText}
            href={href}
            linkColor="darkGray"
            variants={firstRender ? redirectComponentVariants : null}
          />
        </div>
      </StyledAppInfoSide>
    );
};

AppInfoSide.propTypes = {
  handleClickOnMobile: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  firstRender: PropTypes.bool.isRequired,
  animation: PropTypes.bool,
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
  }).isRequired,
  buttonName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default AppInfoSide;