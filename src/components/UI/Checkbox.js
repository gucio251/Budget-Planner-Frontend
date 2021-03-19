import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as Tick} from 'assets/icons/checkboxTick.svg'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledTick = styled(Tick)`
    display: ${props => (props.checked ? 'block' : 'none')};
`

const StyledCheckbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1.5px solid #D7D8DA;
    border-radius: 4px;
`

const Checkbox = ({checked, ...props}) => {
    return (
        <CheckboxContainer {...props}>
            <HiddenCheckbox checked={checked} {...props}/>
            <StyledCheckbox>
                <StyledTick checked={checked}/>
            </StyledCheckbox>
        </CheckboxContainer>
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired
};

export default Checkbox;