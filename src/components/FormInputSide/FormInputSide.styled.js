import styled from "styled-components";
import {Form} from 'formik'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;

  ${({ theme }) => theme.devices.tablet} {
    height: 50vh;
    width: 100vw;
  }

  ${({ theme }) => theme.devices.mobile} {
    display: ${({ displayedOnMobile }) =>
      displayedOnMobile === true ? 'flex' : 'none'};
    width: 100vw;
    height: 100vh;
  }
`;

export const StyledInputSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 30px;

  ${({ theme }) => theme.devices.mobile} {
    width: 80%;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.devices.tablet} {
    overflow: hidden;
    width: 46vw;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

export const StyledInputSideHeader = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.dashboardBlack};
`;

export const StyledInputFields = styled.div`
  position: relative;
  padding-top: 5%;

  ${({ theme }) => theme.devices.mobile} {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
    ${({ theme }) => theme.devices.mobile} {
      margin-top: 20%;
      width: 100%;
    }
`;

export const RedirectComponentWrapper = styled.div`
  color: ${({ theme }) => theme.darkGray};
`;