import React from 'react';
import styled from 'styled-components';
import { ReactComponent as NotFoundIcon } from 'assets/icons/404.svg';
import Button from 'components/UI/Button';
import {navigate} from '@reach/router'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.section`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & *:not(:last-child){
    margin-bottom: 12px;
  }
`;

const StyledBoldedMainText = styled.h3`
    font-size: 32px;
    font-weight: 500;
`

const StyledRegularText = styled.p`
    font-size: 16px;
`

const ButtonWrapper = styled.div`
    width: 30%;
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
    <Wrapper>
      <ContentWrapper>
        <NotFoundIcon />
        <StyledBoldedMainText>Ooops page not found</StyledBoldedMainText>
        <StyledRegularText>
          Check your URL or return to the home page
        </StyledRegularText>
        <ButtonWrapper>
          <Button color="#264AE7" onClick={moveToProperURL}>
            Go home
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default NotFound;
