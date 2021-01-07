import styled from "styled-components";
import {Form} from 'formik'

export const StyledInputSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50vw;

  ${({ theme }) => theme.devices.tablet}{
    height: auto;
    width: 100vw;
    overflow: auto;
    margin-top: 60px;
  }

  ${({ theme }) => theme.devices.mobile}{
    display: ${({ displayedOnMobile }) =>
      displayedOnMobile === true ? 'flex' : 'none'};
    width: 100vw;
    height: 100vh;
    margin-top: 0;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 344px;

  ${({ theme }) => theme.devices.tablet} {
    overflow: hidden;
    width: 46vw;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    padding: 0 5% 0 5%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 100%;
    padding: 0;
  }
`;

export const StyledInputFields = styled.div`
  position: relative;

  ${({ theme }) => theme.devices.mobile} {
    width: 80%;
  }
`;


export const StyledInputSideHeader = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.dashboardBlack};
  width: 259px;

  ${({ theme }) => theme.devices.mobile} {
    width: 80%;
    display: flex;
    justify-content: flex-start;
  }
`;

export const ButtonWrapper = styled.div`
    ${({ theme }) => theme.devices.mobile} {
      margin-top: 45%;
    }
`;

export const RedirectComponentWrapper = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.darkGray};
`;