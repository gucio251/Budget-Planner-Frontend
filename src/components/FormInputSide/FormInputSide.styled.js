import styled from "styled-components";

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
    width: 100vw;
    height: 100vh;
    margin-top: 0;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 344px;

  ${({ theme }) => theme.devices.tablet} {
    overflow: hidden;
    width: 46vw;
  }

  ${({ theme }) => theme.devices.mobile} {
    width: 70%;
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
  margin-bottom: 48px;

  ${({ theme }) => theme.devices.mobile} {
    width: 80%;
  }
`;


export const StyledInputSideHeader = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.mainBlue};
  width: 259px;

  ${({ theme }) => theme.devices.mobile} {
    width: 80%;
    display: flex;
    justify-content: flex-start;
  }
`;

export const RedirectComponentWrapper = styled.div`
  margin-top: 24px;
  color: ${({ theme }) => theme.darkGray};
`;