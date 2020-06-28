import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const StyledIcon = styled.div.attrs(({className}) => ({
  className
}))`
  .info-icon {
    width: 40px;
    height: 40px;
  }

  .background-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    border: 3px solid ${({ theme }) => theme.yellow};
  }
`;

const IconWithBackground = ({icon, className}) => {
    return (
      <StyledIcon className={className}>
        <div className="background-icon">
          <img className="info-icon" src={icon} alt="info-icon" />
        </div>
      </StyledIcon>
    );
};

IconWithBackground.propTypes ={
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default IconWithBackground;