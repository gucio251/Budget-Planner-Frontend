import React from 'react';
import styled from 'styled-components';
import NotFoundIcon from 'assets/icons/404.svg';
import Button from 'components/UI/Button';
import {navigate} from '@reach/router'

const MainWrapper = styled.section`
  height: 100vh;
  overflow-y: auto;
`

const Wrapper = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

const ContentWrapper = styled.section`
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNotFoundIcon = styled.img`
  svg{
    overflow: hidden;
  }

  ${({theme}) => theme.devices.mobile}{
    padding-top: 0;
    width: 100%;
  }
`

const TextAreaWrapper = styled.div`
  width: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({theme}) => theme.devices.mobile}{
    padding-top: 120px;
  }
`

const StyledBoldedMainText = styled.h3`
  margin-top: 0.8em;
  font-size: 1.6em;
  font-weight: 500;

  ${({theme}) => theme.devices.mobile}{
      font-size: 1.2em;
  }
`

const StyledRegularText = styled.p`
  font-size: 1.2em;
  margin: 0.7em 0;

  ${({theme}) => theme.devices.mobile}{
    font-size: 0.8em;
  }
`

const ButtonWrapper = styled.div`
  width: 50%;

  ${({theme}) => theme.devices.mobile}{
    width: 100%;
  }
`

const moveToProperURL = () => {
    if(localStorage.getItem('token')){
        navigate('/dashboard');
    }else{
        navigate('/');
    }
}

const NotFound = () => {
  return (
    <MainWrapper>
      <Wrapper>
        <ContentWrapper>
          <StyledNotFoundIcon src={NotFoundIcon}/>
          <TextAreaWrapper>
            <StyledBoldedMainText>Ooops page not found</StyledBoldedMainText>
            <StyledRegularText>
              Check your URL or return to the home page
            </StyledRegularText>
            <ButtonWrapper>
              <Button onClick={moveToProperURL}>
                Go home
              </Button>
            </ButtonWrapper>
          </TextAreaWrapper>
        </ContentWrapper>
      </Wrapper>
    </MainWrapper>
  );
};

export default NotFound;
