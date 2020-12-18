import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledValidationItem = styled.li`
  color: ${({theme, correctness}) => correctness ? theme.darkMint : theme.darkGray};
`;

const ValidationItem = ({text, correctness}) => {
  return (
    <StyledValidationItem correctness={correctness}>{text}</StyledValidationItem>
  );
};

ValidationItem.propTypes = {
    text: PropTypes.string.isRequired,
    correctness: PropTypes.bool.isRequired
}

export default ValidationItem;