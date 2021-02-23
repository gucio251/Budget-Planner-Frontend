import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select, { components } from 'react-select';

const StyledSingleOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledOptionText = styled.div`
  color: #262C42;
  margin-left: 15px;
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
  //background-color: ${({isFocused}) => isFocused ? 'black!important' : 'white'};
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
  indexOfDefaultValue = null
}) => {
  return (
    <Select
      options={list}
      components={{
        Option: IconOption,
        SingleValue: CustomValueContainer,
      }}
      isSearchable={false}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      name={name}
      noOptionsMessage={() => null}
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

          option: (provided) => ({
            ...provided,

            '&hover': {
              backgroundColor: 'red',
            },
          }),
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
  indexOfDefaultValue: PropTypes.number
};

export default Dropdown;
