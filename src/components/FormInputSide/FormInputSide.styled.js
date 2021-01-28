import styled from "styled-components";
import {Form} from 'formik'

export const Wrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 4em;

  ${({ theme }) => theme.devices.tablet} {
    flex-shrink: 0;
    justify-content: center;
    padding: 2em;
  }

  ${({ theme }) => theme.devices.mobile} {
    display: ${({ displayedOnMobile }) =>
      displayedOnMobile === true ? 'flex' : 'none'};
  };
`;

export const StyledInputSide = styled.div`
  width: max(400px, 50%);
`;


export const StyledInputSideHeader = styled.h2`
  margin-bottom: 2em;
`;


export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;

  & > *:last-child{
    margin-top: 2em;
  }

  ${({ theme }) => theme.devices.mobile} {

  }
`;
