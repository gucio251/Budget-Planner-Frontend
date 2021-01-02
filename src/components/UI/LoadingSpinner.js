import React from 'react';
import styled from 'styled-components'
import {ReactComponent as LoadingSpinnerSvg} from 'assets/icons/loadingSpinner.svg'

const StyledLoadingSpinner = styled(LoadingSpinnerSvg)`
    width: 150px;
    height: 150px;
    animation: rotate 2s linear infinite;
    position: relative;


  circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 10;
    stroke: #2f54f3;
    stroke-linecap: round;
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    transform: translate(5px, 5px);
    animation: animate 4s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate {
    0%,
    100% {
      stroke-dashoffset: 440;
    }
    50% {
      stroke-dashoffset: 0;
    }
    50.1% {
      stroke-dashoffset: 880;
    }
  }
`;

const LoadingSpinner = () => {
    return (
        <StyledLoadingSpinner />
    );
};

export default LoadingSpinner;