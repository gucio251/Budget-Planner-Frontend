import styled from "styled-components";
import { ReactComponent as SuccessSign } from "assets/icons/successPage.svg"

export const StyledSuccessWindow = styled.div`
  display: flex;
  width: 50vw;
  height: 100vh;
  justify-content: center;

  ${({ theme }) => theme.devices.tablet} {
    height: 100%;
    width: 100vw;
  }

  @keyframes draw {
    0% {
      fill: white;
    }

    80% {
      stroke-dashoffset: 0;
      fill: white;
    }

    100% {
      fill: #264ae7;
      stroke-dashoffset: 0;
    }
  }

  @keyframes drawWithoutFill {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes createBling {
    from {
      opacity: 0;
      transform: translate(0);
    }
    to {
      opacity: 1;
      transform: translate(1);
    }
  }

  #tick {
    fill: none;
    stroke-dasharray: 192;
    stroke-dashoffset: 192;
    animation: draw 1s ease-in forwards;
    animation-delay: 1s;
  }

  #circle {
    stroke-dasharray: 435;
    stroke-dashoffset: 435;
    animation: drawWithoutFill 1s ease-in forwards;
  }

  #Shape-2 {
    fill: none;
    stroke-dasharray: 77;
    stroke-dashoffset: 77;
    animation: draw 1s ease-in forwards;
    animation-delay: 1.5s;
  }

  #bling,
  #bling-2 {
    opacity: 0;
    animation: createBling 1s forwards;
    animation-delay: 2s;
  }
`;

export const StyledSuccessWindowWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: start;

  ${({ theme }) => theme.devices.tablet} {
    height: 50%;
    overflow: auto;
    margin-bottom: 20px;
    align-items: center;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 80%;
    height: 100%;
    padding: 0 5% 0 5%;
  }
`;

export const StyledTitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.dashboardBlack};
  font-weight: bold;
  margin-bottom: 75px;

  ${({ theme }) => theme.devices.tablet}{
    margin-bottom: 35px;
    margin-top: 20px;
  }
`
export const ButtonWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.devices.mobile} {
    margin-top: 20%;
    height: 10%;
  }
`;

export const StyledIcon = styled(SuccessSign)`
  margin-bottom: 92px;

  ${({ theme }) => theme.devices.tablet}{
    margin-bottom: 35px;
  }
`;