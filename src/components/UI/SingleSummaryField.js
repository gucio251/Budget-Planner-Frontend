import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

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

const SingleSummaryField = ({Svg, amount, name}) => {
    return (
        <Wrapper>
            <Svg />
            <AmountWrapper>
                {amount}
            </AmountWrapper>
            <NameHolder>
                {name}
            </NameHolder>
        </Wrapper>
    );
};

SingleSummaryField.propTypes = {
    
};

export default SingleSummaryField;