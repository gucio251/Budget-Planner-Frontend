import styled from "styled-components";
import { ReactComponent as MainGraphic } from "assets/icons/mainGraphic.svg";

export const StyledAppInfoSide = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.lightGrayDisabledButton};
  padding: 2em;

  ${({ theme }) => theme.devices.tablet} {
    display: block;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLogo = styled(MainGraphic)`
  width: 500px;
  height: 372px;

  ${({ theme }) => theme.devices.tablet} {
    width: 318;
    height: 229px;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    height: 100%;
  }
`;

export const MobileSectionWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
    width: 100%;
    margin-top: 3em;
    height: 140px;
  }
`;

