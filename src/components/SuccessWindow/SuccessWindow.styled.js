import styled from "styled-components";
import { ReactComponent as SuccessSign } from "assets/icons/successPage.svg"

export const StyledSuccessWindow = styled.div`
  display: flex;
  width: 50vw;
  height: 100vh;
  justify-content: center;

  ${({ theme }) => theme.devices.tablet}{
    height: auto;
    overflow-y: auto;
    width: 100vw;
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
`;

export const StyledSuccessWindowWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.devices.tablet}{
    height: auto;
    overflow: auto;
    margin-bottom: 20px;
  }
`

export const StyledTitle = styled.span`
  width: 100%;
  font-size: 18px;
  color: ${({ theme }) => theme.mainBlue};
  font-weight: bold;
  margin-bottom: 75px;

  ${({ theme }) => theme.devices.tablet}{
    margin-bottom: 35px;
    margin-top: 20px;
  }
`

export const StyledIcon = styled(SuccessSign)`
  margin-bottom: 92px;

  ${({ theme }) => theme.devices.tablet}{
    margin-bottom: 35px;
  }
`;