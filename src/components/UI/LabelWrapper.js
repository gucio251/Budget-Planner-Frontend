import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ComponentWithLabelWrapper = styled.div`
    width: 100%;
`;

const Label = styled.label`
  position: relative;
  top: -5px;
  color: ${({ theme }) => theme.labelGray};
`

const LabelWrapper = ({children, label}) => {
    return (
      <ComponentWithLabelWrapper>
        <Label htmlFor={label.toLowerCase()}>{label}</Label>
        {children}
      </ComponentWithLabelWrapper>
    );
};

LabelWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string.isRequired
};

export default LabelWrapper;