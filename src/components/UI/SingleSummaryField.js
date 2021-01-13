import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 15px 15px 50px 15px;
`
const StyledNumber = styled(animated.div)`
`;

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 32px;
`

const TitleWrapper = styled.p`
  font-size: 12px;
`

const SingleSummaryField = ({children, amount, name, Icon}) => {
    const data = useSpring({ number: parseInt(Math.abs(amount)), from: { number: 0.00 } });
    return (
      <Wrapper>
        {children}
        <TextWrapper>
          {amount < 0 ? '-' : '+'}
          <Icon />
          <StyledNumber>
            {data.number.interpolate((val) => parseInt(val).toLocaleString('de-DE'))}
          </StyledNumber>
        </TextWrapper>
        <TitleWrapper>{name}</TitleWrapper>
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