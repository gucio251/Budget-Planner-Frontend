import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from 'components/UI/LoadingSpinner'

const StyledArea = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & *:not(:last-child) {
    margin-bottom: 30px;
  }
`;
const StyledMaintext = styled.p`
    font-size: 24px;
    font-weight: bold;
`

const StyledText = styled.p`
    font-size: 16px;
`;

const LoadingInProgress = () => {
    return (
      <StyledArea>
        <LoadingSpinner />
        <StyledMaintext>Updating data</StyledMaintext>
        <StyledText>Wait a moment while we're updating dashboard</StyledText>
      </StyledArea>
    );
};

export default LoadingInProgress;