import styled from "styled-components";
import {Form} from 'formik'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20%;

  ${({ theme }) => theme.devices.mobile} {
    display: ${({ displayedOnMobile }) =>
      displayedOnMobile === true ? 'flex' : 'none'};
    width: 100vw;
    height: 100vh;
    padding: 0 5%;
  }
`;

export const StyledInputSide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  gap: 20px;
`;


export const StyledInputSideHeader = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.dashboardBlack};
`;


export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

export const StyledInputFields = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 5%;
  margin-bottom: 40px;

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