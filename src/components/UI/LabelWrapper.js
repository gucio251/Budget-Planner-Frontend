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

const LabelWrapper = props => {
    const {label} = props;
    return (
      <ComponentWithLabelWrapper>
        <Label htmlFor={label.toLowerCase()}>{label}</Label>
        {props.children}
      </ComponentWithLabelWrapper>
    );
};

LabelWrapper.propTypes = {
    
};

export default LabelWrapper;