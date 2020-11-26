import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

import CountUp from 'react-countup';

const Wrapper = styled.div`
  width: 100%;
  height: 186px;
  background-color: #ffffff;
  padding: 3%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 15px;
`;

const AmountWrapper = styled.span`
    color: ${({theme}) => theme.dashboardBlack};
    font-size: 32px;
    font-weight: bold;
`

const NameHolder = styled.span`
  color: ${({ theme }) => theme.dashboardBlack};
  font-size: 12px;
`;

const SingleSummaryField = ({children, amount, name}) => {
    return (
      <Wrapper>
        {children}
        <AmountWrapper>
          <CountUp
            className="account-balance"
            start={0}
            end={amount}
            duration={2.75}
            useEasing={true}
            useGrouping={true}
            separator="."
            prefix="$"
            decimals={0}
          />
        </AmountWrapper>
        <NameHolder>{name}</NameHolder>
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