import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledValidationItem = styled.li.attrs((props) => ({
  className: props.className,
}))`

  .correct {
    display: none;
  }

  .valid {
    color: ${({ theme }) => theme.mint};
  }

  .invalid {
    color: ${({ theme }) => theme.darkGray};
  }
`;

const ValidationItem = ({text, correctness, className}) => {
    const validationConditionBaseClass = "validation-condition";
    const validationConditionClassName = correctness
      ? `${validationConditionBaseClass} valid`
      : `${validationConditionBaseClass} invalid`;

      return (
      <StyledValidationItem className={className}>
        <div className={validationConditionClassName}>
          <span>{text}</span>
        </div>
      </StyledValidationItem>
    );
};

ValidationItem.propTypes = {
    text: PropTypes.string.isRequired,
    correctness: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired
}

export default ValidationItem;