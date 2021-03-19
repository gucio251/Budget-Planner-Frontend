import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select, { components } from 'react-select';

import Checkbox from 'components/UI/Checkbox'

const StyledSingleOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledOptionText = styled.div`
  color: #262C42;
`;

const SingleValueContainer = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.errorText};
`;

const IconWrapper = styled.div`
  transform: scale(0.6);
`;

const { Option, SingleValue } = components;

const StyledOption = styled(Option)`
`

const CustomValueContainer = (props) => {
  const { options, data } = props;
  const { label } = data;

  if (label === '') {
    return <SingleValue {...props} />;
  }

  const [currentlyDisplayedOption] = options.filter(
    (option) => option.label === label
  );

  const Icon =
    typeof currentlyDisplayedOption !== 'undefined'
      ? currentlyDisplayedOption.Icon
      : '';

  return (
    <SingleValue {...props}>
      <SingleValueContainer>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <TextContainer>{label}</TextContainer>
      </SingleValueContainer>
    </SingleValue>
  );
};

const IconOption = (props) => {
  const { data } = props;
  return (
    <StyledOption {...props}>
      <StyledSingleOption>
        {props.isMulti && <Checkbox checked={props.isSelected}/>}
        {data.Icon && <data.Icon />}
        <StyledOptionText>{data.label}</StyledOptionText>
      </StyledSingleOption>
    </StyledOption>
  );
};

const Dropdown = ({
  list,
  value,
  onChange,
  name,
  handleBlur,
  isMulti=false
}) => {
  return (
    <Select
      options={list}
      components={{
        Option: IconOption,
        SingleValue: CustomValueContainer,
                ValueContainer: ({ children, ...props }) => {
          let [values, input] = children;

          if (Array.isArray(values)) {
            const result = `${values.length} items selected`;

            values = result;
          }

          return (
            <components.ValueContainer {...props}>
              {values}
              {input}
            </components.ValueContainer>
          );
        }
      }}
      isSearchable={false}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      name={name}
      hideSelectedOptions={isMulti ? false : true}
      backspaceRemovesValue={false}
      noOptionsMessage={() => null}
      isMulti={isMulti}
      styles={{
        container: (provided, state) => ({
          ...provided,
          cursor: 'pointer',

          '&focus': {
            color: 'red',
            border: '2px solid red'
          }
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          transform:
            !state.selectProps.menuIsOpen ||
            state.selectProps.disabledWithoutOption
              ? 'rotate(0deg)'
              : 'rotate(180deg)',
          color: '#707070'
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: '2',
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: 'transparent',
            color: '#FFF',
            cursor: isDisabled ? 'not-allowed' : 'default',
          };
        },
        control: (provided, state) => ({
          ...provided,
          height: '40px',
          boxShadow: 'none',
          overflow: 'auto',
          border: 'none',
          backgroundColor: state.selectProps.disabledWithoutOption
            ? '#EFEFF3'
            : 'white',
          cursor: state.selectProps.disabledWithoutOption && 'not-allowed',
        }),
      }}
    />
  );
};

Dropdown.propTypes = {
  list: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleBlur: PropTypes.func,
  name: PropTypes.string,
  indexOfDefaultValue: PropTypes.number,
  isMulti: PropTypes.bool
};

export default Dropdown;
