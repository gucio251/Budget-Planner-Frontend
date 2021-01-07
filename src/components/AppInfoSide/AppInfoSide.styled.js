import styled from "styled-components";
import { ReactComponent as PigLogo } from "assets/icons/pigLogo.svg";

export const StyledAppInfoSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  width: 50vw;
  color: white;
  background-color: ${({ theme }) => theme.mainBlue};

  svg {
    overflow: visible;
  }

  ${({ theme }) => theme.devices.tablet} {
    height: 50%;
    width: 100vw;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 100vw;
    height: 100vh;
    padding: 0 5% 0 5%;
    align-items: center;
    display: ${({ displayedOnMobile }) => displayedOnMobile ? "flex" : "none"};
  }
`;

export const StyledWelcomeText = styled.div`
  ${({ theme }) => theme.devices.mobile} {
    width: 100%;
  }
`;

export const StyledPigLogo = styled(PigLogo)`
  width: 542px;
  height: 392px;

  #pig-body {
    z-index: 10;
  }

  #success-coin {
    z-index: 5;
  }

  ${({ theme }) => theme.devices.tablet} {
    width: 318;
    height: 229px;
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 300px;
    height: 212px;
  }
`;

export const StyledButtonWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
    width: 100%;
    margin-top: 30px;
  }
`;

export const StyledSwitchMobile = styled.div`
  display: none;
  margin-top: 17px;
  color: ${({ theme }) => theme.lightGray};

  ${({ theme }) => theme.devices.mobile} {
    display: block;
    width: 100%;
  }
`;
