import styled from "styled-components";
import {Form} from 'formik'

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2em;

  ${({ theme }) => theme.devices.tablet} {
    display: block;
    padding: 2em 20%;
  }

  ${({ theme }) => theme.devices.mobile} {
    display: ${({ displayedOnMobile }) =>
      displayedOnMobile === true ? 'flex' : 'none'};
    width: 100vw;
    height: 100vh;
    padding: 0 5%;
  }
`;

export const StyledInputSide = styled.div`
  display: block;
`;


export const StyledInputSideHeader = styled.h2`
  font-size: 1.2em;
  font-weight: 550;
  margin-bottom: 2em;
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
