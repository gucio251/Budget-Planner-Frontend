import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 4px;
  padding: 50px 1em 1em 1em;

  ${({ theme }) => theme.devices.tablet} {
    padding: 50px 0.5em 0.5em 0.5em;
  }

  ${({ theme }) => theme.devices.mobile} {
    padding: 35px 0.5em 0.5em 0.5em;
  }

  svg {
    ${({ theme }) => theme.devices.mobile} {
      width: 17px;
      height: 17px;
    }
  }
`;

const TitleWrapper = styled.p`
  position: absolute;
  top: 0.75em;
  left: 0.75em;
  font-size: 1.2em;
  display: flex;
  align-items: flex-end;

  & > *:first-child {
    margin-right: 0.5em;
  }

  ${({ theme }) => theme.devices.tablet} {
    top: 0.5em;
    left: 0.5em;
  }

  ${({ theme }) => theme.devices.mobile} {
    font-size: 0.9em;
  }
`;
const StyledNumber = styled(animated.div)`
`;

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 2em;

  ${({ theme }) => theme.devices.mobile} {
    font-size: 1.3em;
  }
`;

const SingleSummaryField = ({children, amount, name, Icon}) => {
    const data = useSpring({ number: parseInt(Math.abs(amount)), from: { number: 0.00 } });
    return (
      <Wrapper>
        <TitleWrapper>
          {children}
          {name}
        </TitleWrapper>
        <TextWrapper>
          {amount < 0 ? '-' : '+'}
          <Icon />
          <StyledNumber>
            {data.number.interpolate((val) =>
              parseInt(val).toLocaleString('de-DE')
            )}
          </StyledNumber>
        </TextWrapper>
      </Wrapper>
    );
};

SingleSummaryField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  amount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default SingleSummaryField;