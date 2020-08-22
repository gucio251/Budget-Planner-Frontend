import React from 'react';
import styled from 'styled-components';
import {ReactComponent as ErrorIcon} from './../../assets/icons/errorIcon.svg'

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

  .left-side-item {
    position: absolute;
    left: -1px;
    width: 2.5%;
    height: 105%;
    background-color: red;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }

  .error-content {
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
  }

  .error-content > * {
      margin: 5px;
  }


  .error-text {
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.errorText};
  }

  .error-retry {
    color: red;
    text-decoration: none;
  }
`;

const ErrorMessageBox = ({errorMsg}) => {
    const {msg, link} = errorMsg;
    return (
       <StyledErrorMsg>
           <div className="left-side-item"></div>
           <div className="error-content">
            <ErrorIcon className="error-icon"/>
            <div className="error-text">{msg}</div>
            {link && (<a href={link} className="error-retry">Retry</a>)}
           </div>
       </StyledErrorMsg>
    );
};

export default ErrorMessageBox;