import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as ErrorIcon} from 'assets/icons/errorIcon.svg'

const StyledErrorMsg = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 3em;
  border-radius: 0.4em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #d3d7db;
  position: relative;
`;

const LeftSideRedMark = styled.div`
  position: absolute;
  left: -1px;
  width: 2.5%;
  height: 105%;
  background-color: red;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

const StyledErrorTextWrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;

  & > * {
    margin: 5px;
  }
`;

const StyledErrorText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.errorText};
  flex-grow: ${({ retryPresence }) => retryPresence ? 1 : 3};
`;

const StyledRetryRef = styled.a`
  color: red;
  text-decoration: none;
  display: ${({visibility}) => visibility ? "block" : "none"};
`;

const ErrorMessageBox = ({error}) => {
  const {msg, link} = error;
  const retryPresence = link ? true: false;
    return (
       <StyledErrorMsg>
           <LeftSideRedMark />
           <StyledErrorTextWrapper>
              <ErrorIcon />
              <StyledErrorText retryPresence={retryPresence}>
                {msg}
              </StyledErrorText>
              <StyledRetryRef href={link} visibility={retryPresence}>
                Retry
              </StyledRetryRef>
           </StyledErrorTextWrapper>
       </StyledErrorMsg>
    );
};

ErrorMessageBox.propTypes = {
  errorMsg: PropTypes.shape({
    msg: PropTypes.string.isRequired,
    link: PropTypes.string,
    disabled: PropTypes.bool
  }).isRequired
}

export default ErrorMessageBox;